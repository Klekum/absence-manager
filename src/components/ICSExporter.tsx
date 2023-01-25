import { IcsEvent } from "../types";

interface PropDefs {
  event: IcsEvent,
  children: React.ReactNode
}

export const ICSExporter = ({ event, children }: PropDefs) => {

  const generateEvent = () => {
    const { title, start, end, description } = event;
    const startDateTime = start.toISOString().replace(/-|:|\.\d+/g, "");
    const endDateTime = end.toISOString().replace(/-|:|\.\d+/g, "");
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    return url;
  }

  const download = () => {
    const url = generateEvent();
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "event.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <div onClick={download}>{children}</div>;

}