import { Center, Tooltip } from "@mantine/core";
import {
  IconBallpen,
  IconBook,
  IconKeyboard,
  IconMail,
  IconMessages,
  IconMicrophone,
  IconNotebook,
  IconPodium,
} from "@tabler/icons-react";

interface MediumProps {
  text: string;
}

const MediumIcon: React.FC<MediumProps> = ({ text }) => {
  let icon;
  if (text === "book") {
    icon = <IconBook size={20} />;
  } else if (text === "speech") {
    icon = <IconPodium size={20} />;
  } else if (text === "letter") {
    icon = <IconMail size={20} />;
  } else if (text === "podcast") {
    icon = <IconMicrophone size={20} />;
  } else if (text === "interview") {
    icon = <IconMessages size={20} />;
  } else if (text === "essay") {
    icon = <IconKeyboard size={20} />;
  } else if (text === "poem") {
    icon = <IconNotebook size={20} />;
  } else {
    icon = <IconBallpen size={20} />;
  }

  return (
    <Center>
      <Tooltip
        label={text}
        withArrow
        transitionProps={{ transition: "slide-up", duration: 200 }}
      >
        {icon}
      </Tooltip>
    </Center>
  );
};

export default MediumIcon;
