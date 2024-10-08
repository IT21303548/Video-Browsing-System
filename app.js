document.addEventListener('DOMContentLoaded', () => {
  fetchVideos();

  // Handle form submission for Create/Update
  document.getElementById('videoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const videoId = document.getElementById('videoId').value;
    const title = document.getElementById('videoTitle').value;
    const url = document.getElementById('videoURL').value;

    if (videoId) {
      updateVideo(videoId, title, url);
    } else {
      addVideo(title, url);
    }
  });
});

// Fetch Videos (Read)
function fetchVideos() {
  // Replace with real backend URL when integrating with server
  fetch('VideoServlet?action=read')
    .then(response => response.json())
    .then(data => {
      const videoTableBody = document.getElementById('videoTableBody');
      videoTableBody.innerHTML = '';
      data.forEach(video => {
        videoTableBody.innerHTML += `
          <tr>
            <td>${video.id}</td>
            <td>${video.title}</td>
            <td>${video.url}</td>
            <td>
              <button class="btn btn-sm btn-primary btn-edit" onclick="editVideo(${video.id}, '${video.title}', '${video.url}')">Edit</button>
              <button class="btn btn-sm btn-danger btn-delete" onclick="deleteVideo(${video.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// Add Video (Create)
function addVideo(title, url) {
  fetch('VideoServlet?action=create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, url })
  })
  .then(() => {
    document.getElementById('videoForm').reset();
    fetchVideos();
  });
}

// Edit Video
function editVideo(id, title, url) {
  document.getElementById('videoId').value = id;
  document.getElementById('videoTitle').value = title;
  document.getElementById('videoURL').value = url;
}

// Update Video
function updateVideo(id, title, url) {
  fetch('VideoServlet?action=update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, url })
  })
  .then(() => {
    document.getElementById('videoForm').reset();
    fetchVideos();
  });
}

// Delete Video
function deleteVideo(id) {
  fetch(`VideoServlet?action=delete&id=${id}`, { method: 'DELETE' })
  .then(() => fetchVideos());
}
