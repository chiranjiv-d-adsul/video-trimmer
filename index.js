// // // const express = require('express');
// // // const path = require('path');
// // // const multer = require('multer');
// // // const ffmpeg = require('fluent-ffmpeg');
// // // const fs = require('fs');

// // // // Explicitly set the path to the ffmpeg executable
// // // ffmpeg.setFfmpegPath('C:\\ffmpeg-7.0.1-full_build\\bin\\ffmpeg.exe');

// // // const app = express();
// // // const upload = multer({ dest: 'uploads/' });

// // // app.use(express.static(path.join(__dirname, 'public')));
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // app.post('/trim', upload.single('videoFile'), (req, res) => {
// // //   const { startTime, endTime } = req.body;
// // //   const inputFilePath = req.file.path;
// // //   const outputFilePath = `uploads/trimmed-${Date.now()}.mp4`;

// // //   if (!startTime || !endTime || isNaN(startTime) || isNaN(endTime)) {
// // //     res.status(400).send('Invalid start time or end time');
// // //     return;
// // //   }

// // //   ffmpeg(inputFilePath)
// // //     .setStartTime(startTime)
// // //     .setDuration(endTime - startTime)
// // //     .output(outputFilePath)
// // //     .on('end', () => {
// // //       fs.unlinkSync(inputFilePath); // Delete the input file to save space
// // //       res.download(outputFilePath, 'trimmed-video.mp4', (err) => {
// // //         if (err) {
// // //           console.error('Error downloading the file:', err);
// // //         }
// // //         fs.unlinkSync(outputFilePath); // Delete the output file after download
// // //       });
// // //     })
// // //     .on('error', (err) => {
// // //       console.error('Error trimming video:', err);
// // //       res.status(500).send('Error trimming video');
// // //     })
// // //     .run();
// // // });

// // // app.listen(5000, () => {
// // //   console.log('Server is running on port 5000');
// // // });


// // // const express = require('express');
// // // const path = require('path');
// // // const multer = require('multer');
// // // const ffmpeg = require('fluent-ffmpeg');
// // // const fs = require('fs');

// // // // Explicitly set the path to the ffmpeg executable
// // // ffmpeg.setFfmpegPath('C:\\ffmpeg-7.0.1-full_build\\bin\\ffmpeg.exe');

// // // const app = express();
// // // const upload = multer({ dest: 'uploads/' });

// // // app.use(express.static(path.join(__dirname, 'public')));
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // app.post('/trim', upload.single('videoFile'), async (req, res) => {
// // //   const inputFilePath = req.file.path;
// // //   const startTimes = [];
// // //   const endTimes = [];

// // //   Object.keys(req.body).forEach(key => {
// // //     if (key.startsWith('startTime_')) {
// // //       startTimes.push(req.body[key]);
// // //     } else if (key.startsWith('endTime_')) {
// // //       endTimes.push(req.body[key]);
// // //     }
// // //   });

// // //   if (startTimes.length !== endTimes.length || startTimes.some(start => isNaN(start)) || endTimes.some(end => isNaN(end))) {
// // //     res.status(400).send('Invalid start times or end times');
// // //     return;
// // //   }

// // //   const outputFiles = [];
// // //   const promises = startTimes.map((startTime, index) => {
// // //     const endTime = endTimes[index];
// // //     const outputFilePath = `uploads/trimmed-${Date.now()}-${index}.mp4`;
// // //     outputFiles.push(outputFilePath);

// // //     return new Promise((resolve, reject) => {
// // //       ffmpeg(inputFilePath)
// // //         .setStartTime(startTime)
// // //         .setDuration(endTime - startTime)
// // //         .output(outputFilePath)
// // //         .on('end', () => resolve())
// // //         .on('error', err => reject(err))
// // //         .run();
// // //     });
// // //   });

// // //   try {
// // //     await Promise.all(promises);
// // //     fs.unlinkSync(inputFilePath); // Delete the input file to save space

// // //     const videoUrls = outputFiles.map(file => `/${file}`);
// // //     res.json(videoUrls);
// // //   } catch (err) {
// // //     console.error('Error trimming video:', err);
// // //     res.status(500).send('Error trimming video');
// // //   }
// // // });

// // // app.listen(5000, () => {
// // //   console.log('Server is running on port 5000');
// // // });


// // const express = require('express');
// // const path = require('path');
// // const multer = require('multer');
// // const ffmpeg = require('fluent-ffmpeg');
// // const fs = require('fs');

// // // Explicitly set the path to the ffmpeg executable
// // ffmpeg.setFfmpegPath('C:\\ffmpeg-7.0.1-full_build\\bin\\ffmpeg.exe');

// // const app = express();
// // const upload = multer({ dest: 'uploads/' });

// // app.use(express.static(path.join(__dirname, 'public')));

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // app.post('/trim', upload.single('videoFile'), async (req, res) => {
// //   const inputFilePath = req.file.path;
// //   const segmentDuration = parseInt(req.body.duration);

// //   if (isNaN(segmentDuration) || segmentDuration <= 0) {
// //     res.status(400).send('Invalid duration');
// //     return;
// //   }

// //   // Get the duration of the uploaded video
// //   let videoDuration;
// //   try {
// //     videoDuration = await new Promise((resolve, reject) => {
// //       ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
// //         if (err) return reject(err);
// //         resolve(metadata.format.duration);
// //       });
// //     });
// //   } catch (err) {
// //     console.error('Error getting video duration:', err);
// //     res.status(500).send('Error processing video');
// //     return;
// //   }

// //   const outputFiles = [];
// //   const promises = [];
// //   for (let startTime = 0; startTime < videoDuration; startTime += segmentDuration) {
// //     const outputFilePath = `uploads/trimmed-${Date.now()}-${startTime}.mp4`;
// //     outputFiles.push(outputFilePath);

// //     promises.push(new Promise((resolve, reject) => {
// //       ffmpeg(inputFilePath)
// //         .setStartTime(startTime)
// //         .setDuration(segmentDuration)
// //         .output(outputFilePath)
// //         .on('end', () => resolve())
// //         .on('error', err => reject(err))
// //         .run();
// //     }));
// //   }

// //   try {
// //     await Promise.all(promises);
// //     fs.unlinkSync(inputFilePath); // Delete the input file to save space

// //     const videoUrls = outputFiles.map(file => `/${file}`);
// //     res.json(videoUrls);
// //   } catch (err) {
// //     console.error('Error trimming video:', err);
// //     res.status(500).send('Error trimming video');
// //   }
// // });

// // app.listen(5000, () => {
// //   console.log('Server is running on port 5000');
// // });


// all trim

const express = require('express');
const path = require('path');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

// Set the path to the ffmpeg executable
ffmpeg.setFfmpegPath('C:\\ffmpeg-7.0.1-full_build\\bin\\ffmpeg.exe');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/trim', upload.single('videoFile'), async (req, res) => {
  const inputFilePath = req.file.path;
  const segmentDuration = parseInt(req.body.duration);

  if (isNaN(segmentDuration) || segmentDuration <= 0) {
    res.status(400).send('Invalid duration');
    return;
  }

  let videoDuration;
  try {
    videoDuration = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
        if (err) return reject(err);
        resolve(metadata.format.duration);
      });
    });
  } catch (err) {
    console.error('Error getting video duration:', err);
    res.status(500).send('Error processing video');
    return;
  }

  const outputFiles = [];
  const promises = [];
  for (let startTime = 0; startTime < videoDuration; startTime += segmentDuration) {
    const outputFilePath = `uploads/trimmed-${Date.now()}-${startTime}.mp4`;
    outputFiles.push(outputFilePath);

    promises.push(new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .setStartTime(startTime)
        .setDuration(segmentDuration)
        .output(outputFilePath)
        .on('end', () => resolve())
        .on('error', err => reject(err))
        .run();
    }));
  }

  try {
    await Promise.all(promises);
    fs.unlinkSync(inputFilePath); // Delete the input file to save space

    const videoUrls = outputFiles.map(file => `/uploads/${path.basename(file)}`);
    res.json(videoUrls);
  } catch (err) {
    console.error('Error trimming video:', err);
    res.status(500).send('Error trimming video');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


// const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const axios = require('axios');

// // Set the path to the ffmpeg executable
// ffmpeg.setFfmpegPath('C:\\ffmpeg-7.0.1-full_build\\bin\\ffmpeg.exe');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Endpoint to trim video from uploaded file
// app.post('/trim', upload.single('videoFile'), async (req, res) => {
//   const inputFilePath = req.file.path;
//   const segmentDuration = parseInt(req.body.duration);

//   if (isNaN(segmentDuration) || segmentDuration <= 0) {
//     res.status(400).send('Invalid duration');
//     return;
//   }

//   let videoDuration;
//   try {
//     videoDuration = await new Promise((resolve, reject) => {
//       ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
//         if (err) return reject(err);
//         resolve(metadata.format.duration);
//       });
//     });
//   } catch (err) {
//     console.error('Error getting video duration:', err);
//     res.status(500).send('Error processing video');
//     return;
//   }

//   const outputFiles = [];
//   const promises = [];
//   for (let startTime = 0; startTime < videoDuration; startTime += segmentDuration) {
//     const outputFilePath = `uploads/trimmed-${Date.now()}-${startTime}.mp4`;
//     outputFiles.push(outputFilePath);

//     promises.push(new Promise((resolve, reject) => {
//       ffmpeg(inputFilePath)
//         .setStartTime(startTime)
//         .setDuration(segmentDuration)
//         .output(outputFilePath)
//         .on('end', () => resolve())
//         .on('error', err => reject(err))
//         .run();
//     }));
//   }

//   try {
//     await Promise.all(promises);
//     fs.unlinkSync(inputFilePath); // Delete the input file to save space

//     const videoUrls = outputFiles.map(file => `/uploads/${path.basename(file)}`);
//     res.json(videoUrls);
//   } catch (err) {
//     console.error('Error trimming video:', err);
//     res.status(500).send('Error trimming video');
//   }
// });

// // Endpoint to trim video from URL
// app.post('/trim-from-url', async (req, res) => {
//   const videoUrl = req.body.url;
//   const segmentDuration = parseInt(req.body.duration);

//   if (!videoUrl || isNaN(segmentDuration) || segmentDuration <= 0) {
//     res.status(400).send('Invalid URL or duration');
//     return;
//   }

//   const tempVideoPath = `uploads/temp-${Date.now()}.mp4`;

//   try {
//     // Download the video
//     const response = await axios({
//       method: 'get',
//       url: videoUrl,
//       responseType: 'stream',
//     });

//     const writer = fs.createWriteStream(tempVideoPath);
//     response.data.pipe(writer);

//     await new Promise((resolve, reject) => {
//       writer.on('finish', resolve);
//       writer.on('error', reject);
//     });

//     // Get video duration
//     let videoDuration;
//     try {
//       videoDuration = await new Promise((resolve, reject) => {
//         ffmpeg.ffprobe(tempVideoPath, (err, metadata) => {
//           if (err) return reject(err);
//           resolve(metadata.format.duration);
//         });
//       });
//     } catch (err) {
//       console.error('Error getting video duration:', err);
//       res.status(500).send('Error processing video');
//       return;
//     }

//     const outputFiles = [];
//     const promises = [];
//     for (let startTime = 0; startTime < videoDuration; startTime += segmentDuration) {
//       const outputFilePath = `uploads/trimmed-${Date.now()}-${startTime}.mp4`;
//       outputFiles.push(outputFilePath);

//       promises.push(new Promise((resolve, reject) => {
//         ffmpeg(tempVideoPath)
//           .setStartTime(startTime)
//           .setDuration(segmentDuration)
//           .output(outputFilePath)
//           .on('end', () => resolve())
//           .on('error', err => reject(err))
//           .run();
//       }));
//     }

//     await Promise.all(promises);
//     fs.unlinkSync(tempVideoPath); // Delete the temp file to save space

//     const videoUrls = outputFiles.map(file => `/uploads/${path.basename(file)}`);
//     res.json(videoUrls);
//   } catch (err) {
//     console.error('Error trimming video from URL:', err);
//     res.status(500).send('Error trimming video from URL');
//   }
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
