/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Archive, ArrowRightLeft, Download, Plus, Send, UploadCloud } from "lucide-react";
import { HelpTooltip } from "@/components/inventory/help-tooltip";
import { Field, Select, TextArea } from "@/components/inventory/fields";
import {
  archiveEntityAction,
  changePasswordAction,
  createLocationAction,
  createProductAction,
  createStudioAction,
  createSupplierAction,
  inviteUserAction,
  inventoryTransactionAction,
  sendManualReportAction,
  updateProfileAction,
} from "@/lib/inventory/actions";
import { cartonBreakdown, formatCurrency, formatEastern, formatNumber } from "@/lib/inventory/format";
import { getDashboardData, getProductDetail, getStudioDetail } from "@/lib/inventory/queries";
import { buildWeeklyReportHtml } from "@/lib/inventory/reports";

function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="inventory-page-header">
      <div>
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h1>{title}</h1>
      </div>
      {children ? <div className="inventory-header-actions">{children}</div> : null}
    </header>
  );
}

function MetricCard({ label, value, help }: { label: string; value: string; help?: string }) {
  return (
    <article className="inventory-metric">
      <span>{label} {help ? <HelpTooltip text={help} /> : null}</span>
      <strong>{value}</strong>
    </article>
  );
}

function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="inventory-empty">
      <h2>{title}</h2>
      <p>{body}</p>
      {action}
    </div>
  );
}

function ProductImage({ url, name }: { url?: string | null; name: string }) {
  return url ? <img className="inventory-thumb" src={url} alt="" /> : <span className="inventory-thumb placeholder">{name.slice(0, 2).toUpperCase()}</span>;
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`inventory-badge ${status.toLowerCase().replaceAll("_", "-")}`}>{status.replaceAll("_", " ")}</span>;
}

function ProductTable({ products }: { products: Awaited<ReturnType<typeof getDashboardData>>["products"] }) {
  if (!products.length) {
    return <EmptyState title="No products yet." body="Create your first product to begin tracking inventory by pieces, cartons, and Studio." />;
  }
  return (
    <div className="inventory-table-wrap">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Studio</th>
            <th>Location</th>
            <th>Cartons</th>
            <th>Total pieces</th>
            <th>Unit cost</th>
            <th>Sale price</th>
            <th>Cost value</th>
            <th>Sale value</th>
            <th>Profit</th>
            <th>Status</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const breakdown = cartonBreakdown(product.totalPiecesOnHand, product.piecesPerCarton);
            return (
              <tr key={product.id}>
                <td>
                  <Link href={`/inventory/products/${product.id}`} className="inventory-product-cell">
                    <ProductImage url={product.imageUrl} name={product.name} />
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.internalSku}</small>
                    </span>
                  </Link>
                </td>
                <td>{product.studio?.name || "Unassigned"}</td>
                <td>{product.location?.name || product.locationText || "Not set"}</td>
                <td>{breakdown.fullCartons} + {breakdown.loosePieces} loose</td>
                <td>{formatNumber(product.totalPiecesOnHand)}</td>
                <td>{formatCurrency(product.unitCost)}</td>
                <td>{formatCurrency(product.unitSalePrice)}</td>
                <td>{formatCurrency(product.costValue)}</td>
                <td>{formatCurrency(product.saleValue)}</td>
                <td>{formatCurrency(product.profitValue)} <small>({product.margin.toFixed(1)}%)</small></td>
                <td><StatusBadge status={product.computedStatus} /></td>
                <td>{product.updatedBy ? `${product.updatedBy.firstName} ${product.updatedBy.lastName}` : "System"}<br /><small>{formatEastern(product.updatedAt)}</small></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StudioCards({ studios }: { studios: Awaited<ReturnType<typeof getDashboardData>>["studios"] }) {
  if (!studios.filter((studio) => studio.id !== "unassigned").length) {
    return <EmptyState title="No Studios yet." body="Create your first Studio to begin organizing inventory." action={<Link className="inventory-primary inline" href="/inventory/studios">Create Studio</Link>} />;
  }
  return (
    <div className="inventory-studio-grid">
      {studios.map((studio) => (
        <Link href={studio.id === "unassigned" ? "/inventory/products?assigned=unassigned" : `/inventory/studios/${studio.id}`} className="inventory-studio-card" key={studio.id}>
          {studio.avatarUrl ? <img src={studio.avatarUrl} alt="" /> : <span>{studio.name.slice(0, 2).toUpperCase()}</span>}
          <div>
            <h2>{studio.name}</h2>
            <p>{studio.repName} - {studio.repEmail}</p>
          </div>
          <dl>
            <div><dt>Pieces</dt><dd>{formatNumber(studio.totalPieces)}</dd></div>
            <div><dt>Products</dt><dd>{studio.productCount}</dd></div>
            <div><dt>Cost</dt><dd>{formatCurrency(studio.costValue)}</dd></div>
            <div><dt>Sale</dt><dd>{formatCurrency(studio.saleValue)}</dd></div>
            <div><dt>Profit</dt><dd>{formatCurrency(studio.profitValue)}</dd></div>
            <div><dt>Alerts</dt><dd>{studio.lowStockCount} low / {studio.outOfStockCount} out</dd></div>
          </dl>
          <small>{studio.recentChanges.length ? `Recent: ${studio.recentChanges.join(", ")}` : "No recent changes"}</small>
        </Link>
      ))}
    </div>
  );
}

function StudioForm() {
  return (
    <form action={createStudioAction} className="inventory-form" encType="multipart/form-data">
      <Field label="Studio name" name="name" required help="studioName" />
      <Field label="Studio rep name" name="repName" required help="studioRep" />
      <Field label="Studio rep email" name="repEmail" type="email" required help="email" />
      <Field label="Rep phone" name="repPhone" />
      <Field label="Address" name="address" />
      <Field label="Studio avatar" name="avatar" type="file" help="imageUpload" />
      <TextArea label="Notes" name="notes" />
      <button className="inventory-primary" type="submit"><Plus size={16} /> Create Studio <HelpTooltip k="studioName" /></button>
    </form>
  );
}

function ProductForm({ data }: { data: Awaited<ReturnType<typeof getDashboardData>> }) {
  return (
    <form action={createProductAction} className="inventory-form" encType="multipart/form-data">
      <Field label="Product name" name="name" required help="productName" />
      <Field label="Manual SKU/code" name="manualSku" help="sku" />
      <Select label="Studio" name="studioId" help="studioName">
        <option value="">Unassigned</option>
        {data.studios.filter((studio) => studio.id !== "unassigned" && !studio.archivedAt).map((studio) => <option value={studio.id} key={studio.id}>{studio.name}</option>)}
      </Select>
      <Select label="Supplier" name="supplierId">
        <option value="">Supplier text/custom</option>
        {data.suppliers.filter((supplier) => !supplier.archivedAt).map((supplier) => <option value={supplier.id} key={supplier.id}>{supplier.name}</option>)}
      </Select>
      <Field label="Supplier text" name="supplierText" />
      <Select label="Saved location" name="locationId">
        <option value="">Use custom location</option>
        {data.locations.filter((location) => !location.archivedAt).map((location) => <option value={location.id} key={location.id}>{location.name}</option>)}
      </Select>
      <Field label="Custom location" name="locationText" />
      <Field label="Pieces per carton" name="piecesPerCarton" type="number" required min={1} help="piecesPerCarton" />
      <Field label="Unit cost" name="unitCost" type="number" min={0} step="0.01" help="unitCost" />
      <Field label="Unit sale price" name="unitSalePrice" type="number" min={0} step="0.01" help="unitSalePrice" />
      <Field label="Low-stock threshold" name="lowStockThreshold" type="number" min={0} help="lowStockThreshold" />
      <Field label="Product image" name="image" type="file" help="imageUpload" />
      <TextArea label="Notes" name="notes" />
      <button className="inventory-primary" type="submit"><Plus size={16} /> Create Product <HelpTooltip k="productName" /></button>
    </form>
  );
}

function InventoryActionForms({ data, productId }: { data: Awaited<ReturnType<typeof getDashboardData>>; productId?: string }) {
  const products = productId ? data.products.filter((product) => product.id === productId) : data.products;
  return (
    <div className="inventory-action-grid">
      {(["INITIAL_COUNT", "ADD", "REMOVE", "TRANSFER", "CORRECTION"] as const).map((type) => (
        <details className="inventory-action-card" key={type}>
          <summary>
            {type === "TRANSFER" ? <ArrowRightLeft size={17} /> : <Plus size={17} />}
            {type.replace("_", " ")}
            <HelpTooltip k={type === "REMOVE" ? "removeInventory" : type === "TRANSFER" ? "transferInventory" : type === "CORRECTION" ? "correction" : type === "INITIAL_COUNT" ? "initialCount" : "addInventory"} />
          </summary>
          <form action={inventoryTransactionAction} className="inventory-form compact">
            <input type="hidden" name="type" value={type} />
            <Select label="Product" name="productId" required help="productName" defaultValue={productId}>
              <option value="">Choose product</option>
              {products.map((product) => <option value={product.id} key={product.id}>{product.name} ({product.totalPiecesOnHand} pieces)</option>)}
            </Select>
            <Select label="From Studio" name="fromStudioId" help="studioName">
              <option value="">Unassigned</option>
              {data.studios.filter((studio) => studio.id !== "unassigned").map((studio) => <option value={studio.id} key={studio.id}>{studio.name}</option>)}
            </Select>
            <Field label={type === "CORRECTION" ? "Correct total pieces" : "Quantity pieces"} name="quantityPieces" type="number" min={1} required help="quantityPieces" />
            {type === "TRANSFER" ? (
              <>
                <Select label="To Studio" name="toStudioId" required help="transferInventory">
                  <option value="">Unassigned</option>
                  {data.studios.filter((studio) => studio.id !== "unassigned").map((studio) => <option value={studio.id} key={studio.id}>{studio.name}</option>)}
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
            <button className="inventory-primary" type="submit">Confirm {type.replace("_", " ")}</button>
          </form>
        </details>
      ))}
    </div>
  );
}

function ActivityList({
  activity,
}: {
  activity: Array<{
    id: string;
    summary: string;
    note?: string | null;
    createdAt: Date;
    user?: { firstName: string; lastName: string; email: string } | null;
  }>;
}) {
  if (!activity.length) return <EmptyState title="No activity yet." body="Inventory changes, invites, reports, and profile updates will appear here." />;
  return (
    <ol className="inventory-timeline">
      {activity.map((item) => (
        <li key={item.id}>
          <strong>{item.summary}</strong>
          <span>{formatEastern(item.createdAt)} {item.user ? `by ${item.user.firstName} ${item.user.lastName}` : ""}</span>
          {item.note ? <p>{item.note}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export async function DashboardView({ search }: { search?: string }) {
  const data = await getDashboardData(search);
  return (
    <>
      <PageHeader eyebrow="Studio-first operations" title="Inventory Dashboard">
        <Link className="inventory-secondary" href="/inventory/reports/pending">View Report <HelpTooltip k="weeklyReport" /></Link>
      </PageHeader>
      <section className="inventory-metrics">
        <MetricCard label="Cost on hand" value={formatCurrency(data.metrics.costValue)} help="Total pieces on hand x current unit cost." />
        <MetricCard label="Sale value on hand" value={formatCurrency(data.metrics.saleValue)} help="Total pieces on hand x current sale price." />
        <MetricCard label="Estimated profit" value={formatCurrency(data.metrics.profitValue)} />
        <MetricCard label="Total pieces" value={formatNumber(data.metrics.totalPieces)} />
        <MetricCard label="Products" value={String(data.metrics.productCount)} />
        <MetricCard label="Alerts" value={`${data.metrics.lowStockCount} low / ${data.metrics.outOfStockCount} out`} />
      </section>
      <section className="inventory-panel">
        <h2>Quick actions</h2>
        <InventoryActionForms data={data} />
      </section>
      <section className="inventory-panel">
        <h2>Studios</h2>
        <StudioCards studios={data.studios} />
      </section>
      <section className="inventory-panel">
        <h2>Products</h2>
        <ProductTable products={data.products} />
      </section>
      <section className="inventory-panel">
        <h2>Recent activity</h2>
        <ActivityList activity={data.activity} />
      </section>
    </>
  );
}

export async function StudiosView() {
  const data = await getDashboardData();
  return (
    <>
      <PageHeader eyebrow="Settings and inventory by Studio" title="Studios" />
      <section className="inventory-panel"><h2>Create Studio</h2><StudioForm /></section>
      <section className="inventory-panel"><StudioCards studios={data.studios} /></section>
    </>
  );
}

export async function StudioDetailView({ id }: { id: string }) {
  const data = await getDashboardData();
  const detail = await getStudioDetail(id);
  if (!detail.studio) return <EmptyState title="Studio not found." body="This Studio may have been archived or removed." />;
  const studioMetrics = data.studios.find((studio) => studio.id === id);
  return (
    <>
      <div className="inventory-breadcrumbs"><Link href="/inventory/studios">Studios</Link> / {detail.studio.name}</div>
      <PageHeader eyebrow={detail.studio.repEmail} title={detail.studio.name} />
      {studioMetrics ? (
        <section className="inventory-metrics">
          <MetricCard label="Pieces" value={formatNumber(studioMetrics.totalPieces)} />
          <MetricCard label="Products" value={String(studioMetrics.productCount)} />
          <MetricCard label="Cost value" value={formatCurrency(studioMetrics.costValue)} />
          <MetricCard label="Sale value" value={formatCurrency(studioMetrics.saleValue)} />
          <MetricCard label="Estimated profit" value={formatCurrency(studioMetrics.profitValue)} />
          <MetricCard label="Alerts" value={`${studioMetrics.lowStockCount} low / ${studioMetrics.outOfStockCount} out`} />
        </section>
      ) : null}
      <section className="inventory-panel"><h2>Products</h2><ProductTable products={detail.products} /></section>
      <section className="inventory-panel"><h2>Studio activity</h2><ActivityList activity={detail.activity} /></section>
      <section className="inventory-panel danger">
        <h2>Archive Studio</h2>
        <form action={archiveEntityAction} className="inventory-form compact">
          <input type="hidden" name="entity" value="studio" />
          <input type="hidden" name="id" value={id} />
          <Field label="Type ARCHIVE" name="confirm" required help="archive" />
          <button className="inventory-danger" type="submit"><Archive size={16} /> Archive Studio</button>
        </form>
      </section>
    </>
  );
}

export async function ProductsView() {
  const data = await getDashboardData();
  return (
    <>
      <PageHeader eyebrow="Search, filter, and value current inventory" title="Products" />
      <section className="inventory-panel"><h2>Create Product</h2><ProductForm data={data} /></section>
      <section className="inventory-panel"><h2>Inventory actions</h2><InventoryActionForms data={data} /></section>
      <section className="inventory-panel"><h2>Product table</h2><ProductTable products={data.products} /></section>
    </>
  );
}

export async function ProductDetailView({ id }: { id: string }) {
  const data = await getDashboardData();
  const detail = await getProductDetail(id);
  if (!detail.product) return <EmptyState title="Product not found." body="This product may have been archived or removed." />;
  const product = data.products.find((item) => item.id === id);
  if (!product) return null;
  const breakdown = cartonBreakdown(product.totalPiecesOnHand, product.piecesPerCarton);
  return (
    <>
      <div className="inventory-breadcrumbs"><Link href="/inventory/products">Products</Link> / {product.name}</div>
      <PageHeader eyebrow={product.internalSku} title={product.name} />
      <section className="inventory-product-hero">
        <ProductImage url={product.imageUrl} name={product.name} />
        <div>
          <StatusBadge status={product.computedStatus} />
          <p>{product.notes || "No product notes yet."}</p>
        </div>
      </section>
      <section className="inventory-metrics">
        <MetricCard label="Full cartons" value={String(breakdown.fullCartons)} />
        <MetricCard label="Loose pieces" value={String(breakdown.loosePieces)} />
        <MetricCard label="Total pieces" value={formatNumber(product.totalPiecesOnHand)} />
        <MetricCard label="Cost value" value={formatCurrency(product.costValue)} />
        <MetricCard label="Sale value" value={formatCurrency(product.saleValue)} />
        <MetricCard label="Profit / margin" value={`${formatCurrency(product.profitValue)} / ${product.margin.toFixed(1)}%`} />
      </section>
      <section className="inventory-panel"><h2>Inventory actions</h2><InventoryActionForms data={data} productId={id} /></section>
      <section className="inventory-panel">
        <h2>Balances</h2>
        <div className="inventory-table-wrap">
          <table className="inventory-table">
            <thead><tr><th>Studio</th><th>Location</th><th>Pieces</th></tr></thead>
            <tbody>{detail.product.balances.map((balance) => <tr key={balance.id}><td>{balance.studio?.name || "Unassigned"}</td><td>{balance.location?.name || balance.locationText || "Not set"}</td><td>{formatNumber(balance.piecesOnHand)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="inventory-panel"><h2>History</h2><ActivityList activity={detail.activity} /></section>
      <section className="inventory-panel danger">
        <h2>Archive Product</h2>
        <form action={archiveEntityAction} className="inventory-form compact">
          <input type="hidden" name="entity" value="product" />
          <input type="hidden" name="id" value={id} />
          <Field label="Type ARCHIVE" name="confirm" required help="archive" />
          <button className="inventory-danger" type="submit"><Archive size={16} /> Archive Product</button>
        </form>
      </section>
    </>
  );
}

export async function ActivityView() {
  const data = await getDashboardData();
  return (
    <>
      <div className="inventory-breadcrumbs"><Link href="/inventory/dashboard">Dashboard</Link> / Activity</div>
      <PageHeader eyebrow="Eastern Time audit trail" title="Activity" />
      <section className="inventory-panel"><ActivityList activity={data.activity} /></section>
    </>
  );
}

export async function ReportsView({ pending = false }: { pending?: boolean }) {
  const data = await getDashboardData();
  const preview = pending ? await buildWeeklyReportHtml(true) : null;
  return (
    <>
      <div className="inventory-breadcrumbs"><Link href="/inventory/dashboard">Dashboard</Link> / Reports</div>
      <PageHeader eyebrow="Friday 5 PM Eastern scheduled report" title={pending ? "Pending Weekly Report" : "Reports"}>
        <Link className="inventory-secondary" href="/api/inventory/exports?format=csv"><Download size={16} /> CSV <HelpTooltip k="exportData" /></Link>
        <Link className="inventory-secondary" href="/api/inventory/exports?format=xlsx"><Download size={16} /> XLSX <HelpTooltip k="exportData" /></Link>
      </PageHeader>
      <section className="inventory-panel">
        <h2>Manual report tools</h2>
        <div className="inventory-button-row">
          <form action={sendManualReportAction}>
            <input type="hidden" name="mode" value="manual" />
            <button className="inventory-primary" type="submit"><Send size={16} /> Send Now <HelpTooltip k="weeklyReport" /></button>
          </form>
          <form action={sendManualReportAction}>
            <input type="hidden" name="mode" value="test" />
            <button className="inventory-secondary" type="submit">Send Test to Me <HelpTooltip k="weeklyReport" /></button>
          </form>
          <Link className="inventory-secondary" href="/inventory/reports/pending">Preview pending report</Link>
        </div>
      </section>
      {preview ? <section className="inventory-panel"><h2>Preview</h2><iframe title="Weekly report preview" className="inventory-report-frame" srcDoc={preview} /></section> : null}
      <section className="inventory-panel">
        <h2>Report history</h2>
        {data.reports.length ? <ActivityReportTable reports={data.reports} /> : <EmptyState title="No reports yet." body="Scheduled and manual report runs will appear here." />}
      </section>
    </>
  );
}

function ActivityReportTable({ reports }: { reports: Awaited<ReturnType<typeof getDashboardData>>["reports"] }) {
  return (
    <div className="inventory-table-wrap">
      <table className="inventory-table">
        <thead><tr><th>Date/time</th><th>Type</th><th>Status</th><th>Recipients</th><th>Subject</th></tr></thead>
        <tbody>{reports.map((report) => <tr key={report.id}><td>{formatEastern(report.createdAt)}</td><td>{report.runType}</td><td>{report.status}</td><td>{report.recipientEmails.length}</td><td>{report.subject}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export async function SettingsView({ user, section }: { user: { id: string; firstName: string; lastName: string; email: string; reportOptIn: boolean; themePreference: string }; section: string }) {
  const data = await getDashboardData();
  return (
    <>
      <div className="inventory-breadcrumbs"><Link href="/inventory/dashboard">Dashboard</Link> / Settings</div>
      <PageHeader eyebrow="Portal administration" title={`Settings: ${section}`} />
      <nav className="inventory-tabs">
        {["profile", "users", "suppliers", "locations", "reporting"].map((tab) => <Link key={tab} href={`/inventory/settings/${tab}`}>{tab}</Link>)}
      </nav>
      {section === "profile" ? (
        <section className="inventory-panel">
          <h2>Profile</h2>
          <form action={updateProfileAction} className="inventory-form" encType="multipart/form-data">
            <Field label="First name" name="firstName" required help="firstName" defaultValue={user.firstName} />
            <Field label="Last name" name="lastName" required help="lastName" defaultValue={user.lastName} />
            <Select label="Theme preference" name="themePreference" defaultValue={user.themePreference}>
              <option value="SYSTEM">System</option><option value="LIGHT">Light</option><option value="DARK">Dark</option>
            </Select>
            <Field label="Avatar" name="avatar" type="file" help="imageUpload" />
            <label className="inventory-checkbox"><input name="reportOptIn" type="checkbox" defaultChecked={user.reportOptIn} /> Weekly report opt-in</label>
            <button className="inventory-primary" type="submit"><UploadCloud size={16} /> Save Profile</button>
          </form>
          <h2>Change password</h2>
          <form action={changePasswordAction} className="inventory-form compact">
            <Field label="Current password" name="currentPassword" type="password" required help="password" />
            <Field label="New password" name="newPassword" type="password" required help="password" />
            <button className="inventory-secondary" type="submit">Change password</button>
          </form>
        </section>
      ) : null}
      {section === "users" ? (
        <section className="inventory-panel">
          <h2>Invite user</h2>
          <form action={inviteUserAction} className="inventory-form">
            <Field label="First name" name="firstName" required help="firstName" />
            <Field label="Last name" name="lastName" required help="lastName" />
            <Field label="Email" name="email" type="email" required help="email" />
            <button className="inventory-primary" type="submit">Send Invite <HelpTooltip k="inviteUser" /></button>
          </form>
          <ProductLikeUsers users={data.users} />
        </section>
      ) : null}
      {section === "suppliers" ? (
        <section className="inventory-panel">
          <h2>Suppliers</h2>
          <form action={createSupplierAction} className="inventory-form">
            <Field label="Supplier name" name="name" required />
            <Field label="Contact name" name="contactName" />
            <Field label="Email" name="email" type="email" help="email" />
            <Field label="Phone" name="phone" />
            <TextArea label="Notes" name="notes" />
            <button className="inventory-primary" type="submit">Create Supplier</button>
          </form>
          <SimpleList items={data.suppliers.map((supplier) => `${supplier.name}${supplier.archivedAt ? " (archived)" : ""}`)} empty="No suppliers yet." />
        </section>
      ) : null}
      {section === "locations" ? (
        <section className="inventory-panel">
          <h2>Locations</h2>
          <form action={createLocationAction} className="inventory-form">
            <Field label="Location name" name="name" required />
            <TextArea label="Description/notes" name="description" />
            <button className="inventory-primary" type="submit">Create Location</button>
          </form>
          <SimpleList items={data.locations.map((location) => `${location.name}${location.archivedAt ? " (archived)" : ""}`)} empty="No locations yet." />
        </section>
      ) : null}
      {section === "reporting" ? <ReportsView /> : null}
    </>
  );
}

function SimpleList({ items, empty }: { items: string[]; empty: string }) {
  return items.length ? <ul className="inventory-simple-list">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <EmptyState title={empty} body="Add one above to make it available in product forms." />;
}

function ProductLikeUsers({ users }: { users: Awaited<ReturnType<typeof getDashboardData>>["users"] }) {
  return (
    <div className="inventory-table-wrap">
      <table className="inventory-table">
        <thead><tr><th>User</th><th>Email</th><th>Status</th><th>Reports</th><th>Last login</th><th>Action</th></tr></thead>
        <tbody>{users.map((item) => (
          <tr key={item.id}>
            <td>{item.firstName} {item.lastName}{item.isOriginalAdmin ? " (original admin)" : ""}</td>
            <td>{item.email}</td>
            <td>{item.status}</td>
            <td>{item.reportOptIn ? "Opted in" : "Opted out"}</td>
            <td>{item.lastLoginAt ? formatEastern(item.lastLoginAt) : "Never"}</td>
            <td>
              {item.status === "ACTIVE" && !item.isOriginalAdmin ? (
                <form action={archiveEntityAction} className="inventory-inline-form">
                  <input type="hidden" name="entity" value="user" />
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="confirm" value="ARCHIVE" />
                  <button className="inventory-secondary" type="submit">Deactivate <HelpTooltip k="archive" /></button>
                </form>
              ) : "Protected"}
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
