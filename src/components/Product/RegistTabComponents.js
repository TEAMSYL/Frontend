import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import imageCompression from "browser-image-compression";
import { alpha, styled } from "@mui/material/styles";

const ProductImg = (props) => {
  const getCompressedImg = async (file) => {
    const options = { maxSizeMB: 2, maxWidthOrHeight: 320 };
    const compressedImg = await imageCompression(file, options);
    return compressedImg;
  };

  const handleAddImages = async (e) => {
    const addedImgs = e.target.files;
    try {
      for (let i = 0; i < addedImgs.length; i++) {
        const compressedImg = await getCompressedImg(addedImgs[i]);
        console.log("압축된 이미지", compressedImg);
        const compressedUrl = await imageCompression.getDataUrlFromFile(
          compressedImg
        );
        const resultFile = { file: compressedImg, url: compressedUrl, id: i };
        // setImages(((Images) => [...Images, resultFile]));
        props.setImgFiles((Images) => [...Images, resultFile]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = (id) => {
    const newImgs = props.imgFiles.filter((img) => img.id !== id);
    props.setImgFiles(newImgs);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <label
          for="input-file"
          onChange={handleAddImages}
          style={{ display: "inline-block", width: "115px" }}
        >
          <input
            id="input-file"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            multiple
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "115px",
              height: "35px",
              backgroundColor: "#FAFAFD",
              border: "1px solid #C3C2CC",
              borderRadius: "6px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <CameraAltIcon sx={{ color: "#DCDBE4" }} />
            <Typography fontSize={"13px"} sx={{ color: "#9B99A9" }}>
              이미지 등록
            </Typography>
          </Box>
        </label>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#9B99A9",
            marginLeft: "15px",
          }}
        >
          {props.imgFiles.length} / 8
        </Typography>
      </Box>

      <ImageList sx={{ width: 840 }} cols={4} rowHeight={220}>
        {props.imgFiles.map((img) => (
          <ImageListItem key={img.url}>
            <img
              src={img.url}
              style={{
                width: "200px",
                objectFit: "contain",
                border: "1px solid #E6E5EF",
                backgroundColor: "#FAFAFD",
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                right: "5px",
              }}
              onClick={() => deleteImage(img.id)}
            >
              <ClearIcon
                fontSize={"small"}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "50%",
                  fontSize: "20px",
                  color: "#FFFFFF",
                }}
              />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
      <ul style={{ listStyle: "none", color: "#4AA4FF", fontSize: "14px" }}>
        <li>* 상품 이미지의 사이즈는 640x640에 최적화 되어 있습니다.</li>
        <li>
          - 이미지를 가급적 권장 사이즈(640x640)로 맞춰서 업로드 해주세요.
        </li>
        <li>
          - 권장 사이즈(640x640)을 넘어가는 이미지는 자동으로 리사이징 됩니다.
        </li>
      </ul>
    </Box>
  );
};

const ProductName = (props) => {
  const [nameLen, setNameLen] = React.useState(0);
  const maxLen = 40;
  const [_name, set_Name] = React.useState("");

  const handleNameChange = (e) => {
    setNameLen(e.target.value.length);
    props.setName(e.target.value);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        hiddenLabel
        id="product-name"
        placeholder="상품 제목을 입력해주세요. (최대 40자)"
        sx={{
          width: "720px",
          height: "50px",
          height: "100%",
          width: "100%",
          marginRight: "20px",
        }}
        onChange={(e) => {
          handleNameChange(e);
        }}
        inputProps={{
          maxLength: maxLen,
          fontSize: "16px",
        }}
        size="small"
      />
      <Typography
        sx={{
          color: `${props.name.length > 2 ? "#212121" : "#F57E00"}`,
        }}
      >
        {nameLen}/40
      </Typography>
    </Box>
  );
};

const ProductCategory = (props) => {
  return <div>test</div>;
};

const ProductPrice = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "250px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          onChange={(e) => props.setPrice(e.target.value)}
          hiddenLabel
          id="product-price"
          placeholder="숫자만 입력해주세요."
          inputProps={{
            inputMode: "numeric",
            parttern: "[0-9]*",
            fontSize: "16px",
          }}
          sx={{
            height: "100%",
            width: "100%",
            marginRight: "20px",
          }}
          size="small"
        />
        <Typography> ETH</Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: "#4AA4FF",
            fontSize: "14px",
            marginTop: "5px",
          }}
        >
          1ETH = {100}원 ({"날짜정보"} 기준)
        </Typography>
      </Box>
    </Box>
  );
};

const ProductDescription = (props) => {
  const [descriptionLen, setLen] = React.useState(0);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "800px",
        }}
      >
        <TextField
          hiddenLabel
          id="product-description"
          size="small"
          multiline
          rows={6}
          placeholder="상품 설명을 입력해주세요."
          onChange={(e) => {
            setLen(e.target.value.length);
            props.setDescription(e.target.value);
          }}
          sx={{
            width: "800px",
          }}
        />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "end",
            marginRight: "20px",
            marginTop: "10px",
          }}
        >
          {descriptionLen} / 2000
        </Typography>
      </Box>
    </Box>
  );
};

export {
  ProductCategory,
  ProductDescription,
  ProductImg,
  ProductName,
  ProductPrice,
};
