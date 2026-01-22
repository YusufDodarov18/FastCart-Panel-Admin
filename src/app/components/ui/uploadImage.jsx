import { Box, Button, Typography } from "@mui/material";
import { UploadIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";

const UploadImage = ({ setImages }) => {
  const file = useRef(null);
  const fileToBase64 = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = (err) => rej(err);
    });
  };

  const getFile = async (e) => {
    const files = Array.from(e.target.files);

    const addFile = await Promise.all(
      files.map(async (file) => ({
        id: Date.now(),
        file,
        base64: await fileToBase64(file),
      })),
    );
    setImages((prev) => [...prev, ...addFile]);
    e.target.value = null;
    toast.success("The image was successfully captured.", {
      autoClose: 1000,
    });
  };
  return (
    <Box className="border-1 border-gray-300 px-4 py-5 flex justify-center items-center gap-2 flex-col text-center">
      <input
        type="file"
        ref={file}
        multiple
        onChange={getFile}
        className="hidden"
        accept="image/png, image/jpeg, image/svg+xml, image/gif"
      />
      <Button
        onClick={() => file.current.click()}
        size="small"
        variant="contained"
        sx={{
          minWidth: 32,
          width: 40,
          height: 40,
          backgroundColor: "#E5E7EB",
          color: "#272626",
          borderRadius: "50%",
        }}
      >
        <UploadIcon />
      </Button>
      <Typography variant="h" className="font-black">
        <u onClick={() => file.current.click()} className="cursor-pointer">
          Click to upload
        </u>
        or drag and drop
      </Typography>
      <Typography variant="overline">
        (SVG, JPG, PNG, or gif maximum 900x400)
      </Typography>
    </Box>
  );
};

export default UploadImage;
