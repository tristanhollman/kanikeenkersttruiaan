import { Handlers, PageProps } from "$fresh/server.ts";

interface HomeProps {
  canWearSweater: boolean;
  daysUntilChristmas: number;
}

export const handler: Handlers<HomeProps> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const result = url.searchParams.get("result");

    let canWearSweater: boolean;
    if (result === "yes") {
      canWearSweater = true;
    } else if (result === "no") {
      canWearSweater = false;
    } else {
      const today = new Date();
      const start = new Date(today.getFullYear(), 11, 1); // 1 Dec
      const end = new Date(today.getFullYear(), 11, 25); // 25 Dec
      canWearSweater = today >= start && today <= end;
    }

    const today = new Date();
    const christmas = new Date(today.getFullYear(), 11, 25);
    const diffTime = Math.abs(christmas.getTime() - today.getTime());
    const daysUntilChristmas = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return ctx.render({ canWearSweater, daysUntilChristmas });
  },
};

export default function Home({ data }: PageProps<HomeProps>) {
  const { canWearSweater, daysUntilChristmas } = data;

  return (
    <div
      class={`min-h-screen px-4 py-8 mx-auto ${
        canWearSweater ? "bg-green-500" : "bg-red-500"
      } transition-colors duration-500`}
    >
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Can I Wear a Christmas Sweater?</h1>
        <img
          class={`my-6 ${
            canWearSweater ? "animate-bounce" : "animate-pulse"
          }`}
          src={canWearSweater ? "/sweater-yes.jpg" : "/sweater-no.jpg"}
          style={{ width: "250px" }}
          alt="Christmas Sweater"
        />
        <p class="text-2xl">
          {canWearSweater
            ? "Yes, you can wear a Christmas sweater!"
            : "No, you cannot wear a Christmas sweater yet."}
        </p>
        <p class="text-xl mt-4">
          {daysUntilChristmas} days until Christmas!
        </p>
      </div>
    </div>
  );
}
