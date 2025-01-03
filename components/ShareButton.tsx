import { JSX } from "preact";

export function ShareButton() {
  const share = () => {
    const url = window.location.href;
    const text = "Check out this website to see if you can wear a Christmas sweater!";
    if (navigator.share) {
      navigator.share({
        title: "Can I Wear a Christmas Sweater?",
        text,
        url,
      });
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <button
      onClick={share}
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Share
    </button>
  );
}
