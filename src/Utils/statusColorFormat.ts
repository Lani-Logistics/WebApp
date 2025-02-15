export const statusColorFormat = (status: string) => {
  switch (status) {
    case "in transit":
      return "bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full text-sm font-medium font-sora";
    case "delivered":
      return "bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-sm font-medium font-sora";
    case "cancelled":
      return "bg-red-500/10 text-red-500 px-2 py-1 rounded-full text-sm font-medium font-sora";
    default:
      return "bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full text-sm font-medium font-sora";
  }
};

