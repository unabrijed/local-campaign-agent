import { MapPin, Send } from "lucide-react";
import { billboardInventory, ownerListingFields } from "@/data/localboardDemo";

export const BillboardOwners = () => {
  return (
    <section id="billboard-owners" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              08: For board owners
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
              Own a billboard or local high-attention space?
            </h2>
            <p className="mt-4 text-lg font-light text-muted-foreground">
              Add your board details, location, landmark, weekly price, audience tags, and proof
              requirements. LocalBoard can then match your inventory to advertisers whose audience
              already moves through that hotspot.
            </p>
            <div className="mt-8 rounded-2xl warm-bg border border-border/70 p-5 text-sm font-light text-muted-foreground">
              MVP note: listings are reviewable only. LocalBoard does not auto-book, auto-charge, or
              auto-contact advertisers without human approval.
            </div>
          </div>

          <div className="lg:col-span-3 glass-card rounded-3xl p-6 bg-card">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Listing intake preview
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-3">
              {ownerListingFields.map((field) => (
                <div key={field} className="rounded-xl bg-background/60 border border-border/70 px-4 py-3 text-sm font-light text-muted-foreground">
                  {field}
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-light">
              Submit board for review
              <Send className="w-4 h-4" />
            </button>

            <div className="mt-8 border-t border-border/70 pt-6">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Example listed boards
              </div>
              <div className="mt-4 space-y-3">
                {billboardInventory.slice(0, 2).map((board) => (
                  <div key={board.title} className="rounded-2xl bg-background/60 border border-border/70 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-light">{board.title}</div>
                        <div className="mt-1 text-sm font-light text-muted-foreground">
                          {board.area} · {board.microZone} · {board.weeklyPrice}
                        </div>
                      </div>
                      <MapPin className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
