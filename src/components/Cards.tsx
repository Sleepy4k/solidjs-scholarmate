import { Component } from "solid-js";
import Card from "@suid/material/Card";
import { CardActionArea } from "@suid/material";
import CardMedia from "@suid/material/CardMedia";
import Typography from "@suid/material/Typography";
import CardContent from "@suid/material/CardContent";

const Cards: Component<{ name: string, major: string, status: string, image: string }> = (props) => {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 200, width: 700 }}
          image={props.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">Beasiswa</Typography>
          <Typography gutterBottom variant="h6" component="div">{props.name}</Typography>
          <Typography gutterBottom variant="body2" component="div">Jurusan</Typography>
          <Typography gutterBottom variant="h6" component="div">{props.major}</Typography>
          <Typography gutterBottom variant="body2" component="div">Status</Typography>
          <Typography gutterBottom variant="h6" component="div">{props.status}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Cards;