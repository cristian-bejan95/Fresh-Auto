export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "freshauto_upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dj1mswvqf/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return data.secure_url;
}
