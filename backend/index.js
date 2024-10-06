const express = require("express");
const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize S3 client using AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ dest: "uploads/" });

// Upload file to S3
app.post("/upload", upload.single("file"), async (req, res) => {
  const fileContent = fs.readFileSync(req.file.path);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: req.file.originalname,
    Body: fileContent,
    ContentType: "application/pdf",
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// List files from S3
app.get("/files", async (req, res) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);
    const files = data.Contents.map((file) => ({
      key: file.Key,
      url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${file.Key}`,
    }));
    res.status(200).send(files);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Delete file from S3
app.delete("/delete/:key", async (req, res) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: req.params.key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    res.status(200).send({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
