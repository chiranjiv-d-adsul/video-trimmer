// document.getElementById('uploadForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append('videoFile', document.getElementById('videoFile').files[0]);
//   formData.append('duration', document.getElementById('duration').value);

//   try {
//       const response = await fetch('/trim', {
//           method: 'POST',
//           body: formData,
//       });

//       const data = await response.json();
//       displayVideos(data);
//   } catch (error) {
//       console.error('Error trimming video:', error);
//   }
// });

// document.getElementById('urlForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const videoUrl = document.getElementById('videoUrl').value;
//   const duration = document.getElementById('urlDuration').value;

//   try {
//       const response = await fetch('/trim-from-url', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ url: videoUrl, duration }),
//       });

//       const data = await response.json();
//       displayVideos(data);
//   } catch (error) {
//       console.error('Error trimming video from URL:', error);
//   }
// });

// function displayVideos(videoUrls) {
//   const resultDiv = document.getElementById('result');
//   resultDiv.innerHTML = '';
//   videoUrls.forEach(url => {
//       const videoElement = document.createElement('video');
//       videoElement.controls = true;
//       videoElement.src = url;
//       videoElement.width = 300;
//       resultDiv.appendChild(videoElement);
//   });
// }
