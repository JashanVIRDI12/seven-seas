import { Button } from "@/components/Button";
import { ArrowUpRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <main id="main" className="doc-page">
      <p className="doc-kicker">Page not found</p>
      <h1>This road doesn’t go anywhere.</h1>
      <p>
        The page you’re looking for isn’t here. Head back to Seven Sea for truck
        and trailer repair in Prince George.
      </p>
      <Button href="/" variant="navy" icon={<ArrowUpRight />}>
        Back to the home page
      </Button>
    </main>
  );
}
