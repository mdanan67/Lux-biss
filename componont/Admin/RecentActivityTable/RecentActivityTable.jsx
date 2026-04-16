import React, { useMemo, useState, useEffect } from "react";

const statusPill = {
  Processing: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Failed: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const typeText = {
  Deposit: "text-slate-700",
  Withdraw: "text-slate-700",
};

function money(v) {
  if (typeof v === "number") return `$${v.toFixed(2)}`;
  if (typeof v === "string" && v.trim() !== "") return v;
  return "-";
}

function SortIcon({ active = false, direction = "none" }) {
  // direction: "asc" | "desc" | "none"
  const cls = active ? "text-slate-600" : "text-slate-300";
  return (
    <span className={`ml-1 inline-flex items-center ${cls}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M6.2 8.2a1 1 0 0 1 1.4 0L10 10.6l2.4-2.4a1 1 0 1 1 1.4 1.4l-3.1 3.1a1 1 0 0 1-1.4 0L6.2 9.6a1 1 0 0 1 0-1.4Z"
          className={direction === "asc" ? "opacity-100" : "opacity-60"}
        />
        <path
          d="M6.2 11.8a1 1 0 0 1 1.4 0L10 14.2l2.4-2.4a1 1 0 1 1 1.4 1.4l-3.1 3.1a1 1 0 0 1-1.4 0L6.2 13.2a1 1 0 0 1 0-1.4Z"
          transform="translate(0,-8)"
          className={direction === "desc" ? "opacity-100" : "opacity-60"}
        />
      </svg>
    </span>
  );
}

/**
 * rows expected shape (you can map your API response to this):
 * {
 *   id: "302012",
 *   date: "02.13 08:34 AM",
 *   amount: 121,
 *   type: "Deposit" | "Withdraw",
 *   paymentMethod: "USDT TRX Tron (TRC20)",
 *   status: "Processing" | "Completed" | "Pending" | "Failed",
 * }
 */
export default function RecentTransactionTable({
  title = "Recent Transaction History",
  rows = [],
  onRowClick,
  onFilterClick,
  onSelectionChange,
  initialSelectedIds = [],
  showFilters = true,
}) {
  const [selected, setSelected] = useState(() => new Set(initialSelectedIds));

  useEffect(() => {
    setSelected(new Set(initialSelectedIds));
  }, [initialSelectedIds]);

  const allIds = useMemo(
    () => rows.map((r, i) => String(r.id ?? r.transactionId ?? i)),
    [rows]
  );

  const selectedCount = selected.size;
  const allSelected = allIds.length > 0 && selectedCount === allIds.length;
  const someSelected = selectedCount > 0 && selectedCount < allIds.length;

  useEffect(() => {
    onSelectionChange?.(Array.from(selected));
  }, [selected, onSelectionChange]);

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        next.clear();
      } else {
        allIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-800">
            {title}
          </div>
        </div>

        {showFilters && (
          <button
            type="button"
            onClick={onFilterClick}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2h-1.2a2.8 2.8 0 0 1 0 8H16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1.2a2.8 2.8 0 0 1 0-8H4a1 1 0 0 1-1-1Zm4 1a.8.8 0 0 0 0 8h6a.8.8 0 0 0 0-8H7Z" />
            </svg>
            Filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <th className="w-10 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-300"
                />
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Transaction ID <SortIcon />
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Date <SortIcon />
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Amount <SortIcon />
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Type <SortIcon />
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Payment Method
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Status <SortIcon />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => {
              const id = String(row.id ?? row.transactionId ?? idx);
              const pill =
                statusPill[row.status] ||
                "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

              return (
                <tr
                  key={id}
                  onClick={() => onRowClick?.(row)}
                  className={[
                    "bg-white",
                    onRowClick ? "cursor-pointer hover:bg-slate-50" : "",
                  ].join(" ")}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected.has(id)}
                      onChange={() => toggleOne(id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-300"
                    />
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium text-sky-600 hover:underline">
                      #{id}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    {row.date ?? "-"}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap font-medium text-slate-800">
                    {money(row.amount)}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={typeText[row.type] || "text-slate-700"}>
                      {row.type ?? "-"}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    {row.paymentMethod ?? "-"}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${pill}`}
                    >
                      {row.status ?? "-"}
                    </span>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No recent transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile hint */}
      <div className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-500 md:hidden">
        Swipe left/right to see more columns.
      </div>
    </div>
  );
}