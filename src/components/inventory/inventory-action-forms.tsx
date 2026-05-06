"use client";

import { useActionState } from "react";
import { ArrowRightLeft, Plus } from "lucide-react";
import { HelpTooltip } from "@/components/inventory/help-tooltip";
import { Field, Select, TextArea } from "@/components/inventory/fields";
import { inventoryTransactionStateAction } from "@/lib/inventory/actions";

type ActionProduct = {
  id: string;
  name: string;
  totalPiecesOnHand: number;
};

type ActionStudio = {
  id: string;
  name: string;
};

export function InventoryActionFormsClient({
  products,
  studios,
  productId,
}: {
  products: ActionProduct[];
  studios: ActionStudio[];
  productId?: string;
}) {
  const visibleProducts = productId ? products.filter((product) => product.id === productId) : products;
  const [state, action, pending] = useActionState(inventoryTransactionStateAction, undefined);

  return (
    <>
      {state?.error ? <p className="inventory-error inventory-form-message">{state.error}</p> : null}
      <div className="inventory-action-grid">
        {(["INITIAL_COUNT", "ADD", "REMOVE", "TRANSFER", "CORRECTION"] as const).map((type) => (
          <details className="inventory-action-card" key={type}>
            <summary>
              {type === "TRANSFER" ? <ArrowRightLeft size={17} /> : <Plus size={17} />}
              {type.replace("_", " ")}
              <HelpTooltip k={type === "REMOVE" ? "removeInventory" : type === "TRANSFER" ? "transferInventory" : type === "CORRECTION" ? "correction" : type === "INITIAL_COUNT" ? "initialCount" : "addInventory"} />
            </summary>
            <form action={action} className="inventory-form compact">
              <input type="hidden" name="type" value={type} />
              <Select label="Product" name="productId" required help="productName" defaultValue={productId}>
                <option value="">Choose product</option>
                {visibleProducts.map((product) => <option value={product.id} key={product.id}>{product.name} ({product.totalPiecesOnHand} pieces)</option>)}
              </Select>
              <Select label="From Studio" name="fromStudioId" help="studioName">
                <option value="">Use product&apos;s assigned Studio</option>
                <option value="__unassigned">Unassigned</option>
                {studios.map((studio) => <option value={studio.id} key={studio.id}>{studio.name}</option>)}
              </Select>
              <Field label={type === "CORRECTION" ? "Correct total pieces" : "Quantity pieces"} name="quantityPieces" type="number" min={1} required help="quantityPieces" />
              {type === "TRANSFER" ? (
                <>
                  <Select label="To Studio" name="toStudioId" required help="transferInventory">
                    <option value="__unassigned">Unassigned</option>
                    {studios.map((studio) => <option value={studio.id} key={studio.id}>{studio.name}</option>)}
                  </Select>
                  <Field label="To location" name="toLocationText" help="transferInventory" />
                </>
              ) : null}
              {type === "REMOVE" ? (
                <Select label="Reason" name="reason" required help="removeInventory">
                  <option value="">Choose reason</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DAMAGED">Damaged</option>
                  <option value="SAMPLE">Sample</option>
                  <option value="CORRECTION">Correction</option>
                  <option value="TRANSFER">Transfer</option>
                  <option value="OTHER">Other</option>
                </Select>
              ) : null}
              <TextArea label="Note / reason" name="note" required={type === "REMOVE" || type === "TRANSFER" || type === "CORRECTION"} help={type === "CORRECTION" ? "correction" : "removeInventory"} />
              <button className="inventory-primary" type="submit" disabled={pending}>
                {pending ? "Saving..." : `Confirm ${type.replace("_", " ")}`}
              </button>
            </form>
          </details>
        ))}
      </div>
    </>
  );
}
