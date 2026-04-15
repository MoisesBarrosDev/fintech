import { create } from "zustand";

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

function getCurrentMonthRange() {
  const today = new Date();

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay),
  };
}

interface DataState {
  start: string;
  end: string;
  status: string | null;
  paymentMethod: string | null;
  search: string;
  page: number;
}

interface DataActions {
  setStart: (date: string) => void;
  setEnd: (date: string) => void;
  setStatus: (status: string | null) => void;
  setPaymentMethod: (paymentMethod: string | null) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

type DataStore = DataState & DataActions;

export const useDataStore = create<DataStore>((set, get) => ({
  ...getCurrentMonthRange(),

  status: null,
  paymentMethod: null,
  search: "",
  page: 1,

  setStart: (date) => set({ start: date }),
  setEnd: (date) => set({ end: date }),
  setStatus: (status) => set({ status, page: 1 }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      status: null,
      paymentMethod: null,
      search: "",
      ...getCurrentMonthRange(),
      page: 1,
    }),

  hasActiveFilters: () => {
    const state = get();
    const currentMonth = getCurrentMonthRange();

    return (
      state.status !== null ||
      state.paymentMethod !== null ||
      state.search !== "" ||
      state.start !== currentMonth.start ||
      state.end !== currentMonth.end
    );
  },
}));
