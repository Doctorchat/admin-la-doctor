import { UserOutlined } from "@ant-design/icons";
import { Image, Tooltip, Comment, Avatar } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import date from "../../../utils/date";
import { useChatViewContext } from "../ChatViewContext";

export default function MessageStep() {
  const { chatInfo, updateChatInfo } = useChatViewContext();

  return (
    <Comment
      className="chat-view-comment"
      author={
        <Link to="/" className="chat-view-comment-user">
          John Doe
        </Link>
      }
      avatar={<Avatar className="chat-view-comment-avatar" size={48} icon={<UserOutlined />} />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      }
      datetime={
        <Tooltip title={date(moment()).dynamic()}>
          <span className="chat-view-comment-date">{moment().fromNow()}</span>
        </Tooltip>
      }
    >
      <div className="chat-view-uploads">
        <Image.PreviewGroup>
          <Image
            width={140}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg"
          />
          <Image
            width={140}
            src="https://th-thumbnailer.cdn-si-edu.com/vSnitgUqCQCRSx7mkHZtHZHry4U=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg"
          />
        </Image.PreviewGroup>
      </div>
    </Comment>
  );
}
