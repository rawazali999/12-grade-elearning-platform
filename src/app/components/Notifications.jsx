import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";
import { useSession } from "next-auth/react";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Notifications() {
  const { data: session } = useSession();

  return (
    <MagicBell
      apiKey={process.env.MAGICBELL_API_KEY}
      userEmail={session?.user?.email}
      theme={theme}
      locale="en"
      BellIcon={<IoMdNotificationsOutline />}
    >
      {(props) => (
        <FloatingNotificationInbox width={400} height={500} {...props} />
      )}
    </MagicBell>
  );
}

const theme = {
  header: {
    fontFamily: "inherit",
    backgroundColor: "#FFFFFF",
    textColor: "#00838F",
    fontSize: "15px",
    borderRadius: "16px",
  },
  notification: {
    default: {
      fontSize: "13px",
      borderRadius: "16px",
      margin: "8px",
      backgroundColor: "#FFFFFF",
      textColor: "#3A424D",
      fontFamily: "inherit",
    },
    unread: {
      backgroundColor: "#F8F5FF",
      textColor: "#3A424D",
      hover: { backgroundColor: "#F2EDFC" },
      state: { color: "#00838F" },
    },
    unseen: {
      backgroundColor: "#F8F5FF",
      textColor: "#3A424D",
      hover: { backgroundColor: "#F2EDFC" },
      state: { color: "#00838F" },
    },
  },
  icon: { borderColor: "#EDEDEF", width: "24px" },
  unseenBadge: { backgroundColor: "#F80808" },
  banner: {
    backgroundColor: "#F8F5FF",
    textColor: "#3A424D",
    fontSize: "14px",
  },
  dialog: {
    backgroundColor: "#F5F5F5",
    textColor: "#313131",
    accentColor: "#00838F",
  },
  footer: {
    fontFamily: "inherit",
    backgroundColor: "#FFFFFF",
    textColor: "#00838F",
    fontSize: "15px",
    borderRadius: "16px",
  },
};
