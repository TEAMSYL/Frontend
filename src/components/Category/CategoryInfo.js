import ComputerIcon from "@mui/icons-material/Computer";
import ChairIcon from "@mui/icons-material/Chair";
import BookIcon from "@mui/icons-material/Book";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import PetsIcon from "@mui/icons-material/Pets";
import MoreIcon from "@mui/icons-material/More";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ParkIcon from "@mui/icons-material/Park";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import {
  orange,
  grey,
  green,
  red,
  yellow,
  blue,
  brown,
} from "@mui/material/colors";

export const CATEGORY = [
  {
    id: 1,
    name: "디지털기기",
    icon: <ComputerIcon sx={{ color: grey[400] }} />,
  },
  { id: 2, name: "가구", icon: <ChairIcon sx={{ color: brown[500] }} /> },
  { id: 3, name: "책", icon: <BookIcon sx={{ color: orange[400] }} /> },
  {
    id: 4,
    name: "티켓/음반",
    icon: <ConfirmationNumberIcon sx={{ color: red[600] }} />,
  },
  { id: 5, name: "의류", icon: <CheckroomIcon sx={{ color: grey[900] }} /> },
  {
    id: 6,
    name: "스포츠용품",
    icon: <SportsTennisIcon sx={{ color: green[400] }} />,
  },
  {
    id: 7,
    name: "반려동물용품",
    icon: <PetsIcon sx={{ color: brown[900] }} />,
  },
  {
    id: 8,
    name: "생활용품",
    icon: <AddShoppingCartIcon sx={{ color: blue[400] }} />,
  },
  { id: 9, name: "식물", icon: <ParkIcon sx={{ color: green[900] }} /> },
  {
    id: 10,
    name: "뷰티/미용",
    icon: <AutoFixHighIcon sx={{ color: yellow[200] }} />,
  },
  {
    id: 11,
    name: "게임",
    icon: <SportsEsportsIcon sx={{ color: red[400] }} />,
  },
  { id: 12, name: "기타", icon: <MoreIcon /> },
];
