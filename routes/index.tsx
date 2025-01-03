import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  const canWearSweater = useSignal(false);
  const daysUntilChristmas = useSignal(0);

  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 11, 1); // 1 Dec
    const end = new Date(today.getFullYear(), 11, 25); // 25 Dec
    canWearSweater.value = today >= start && today <= end;

    const christmas = new Date(today.getFullYear(), 11, 25);
    const diffTime = Math.abs(christmas.getTime() - today.getTime());
    daysUntilChristmas.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  return (
    <div
      class={`px-4 py-8 mx-auto ${
        canWearSweater.value ? "bg-green-500" : "bg-red-500"
      } transition-colors duration-500`}
    >
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Can I Wear a Christmas Sweater?</h1>
        <img
          class={`my-6 ${
            canWearSweater.value ? "animate-bounce" : "animate-pulse"
          }`}
          src={canWearSweater.value ? "/sweater-yes.png" : "/sweater-no.png"}
          width="128"
          height="128"
          alt="Christmas Sweater"
        />
        <p class="text-2xl">
          {canWearSweater.value
            ? "Yes, you can wear a Christmas sweater!"
            : "No, you cannot wear a Christmas sweater yet."}
        </p>
        <p class="text-xl mt-4">
          {daysUntilChristmas.value} days until Christmas!
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
