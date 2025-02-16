import { motion } from "framer-motion";



const OrderFilter = ({
  filter,
  setFilter,
  filters,
  orderType,
  setOrderType,
  types,
  toggleFilter
}: OrderFilterTypes) => {

  const handleFilter = (filter: string) => {
    if (setFilter) {
      setFilter(filter);
    }
    toggleFilter()
  };
  const handleOrderType = (orderType: string) => {
    if (setOrderType) {
      setOrderType(orderType);
    }
    toggleFilter()
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 bg-black/50" onClick={toggleFilter} />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 400 
          }}
          className="w-full md:w-[700px] border border-line h-1/2 bg-secondary z-20 rounded-t-3xl p-4"
        >
          <div onClick={toggleFilter} className="h-[6px] cursor-pointer w-12 mx-auto bg-background-2 rounded-full mb-6" />
          <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-lg font-sora font-medium text-center">
              Order Type
            </h1>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {types.map((item, index) => (
                <button key={index} onClick={()=>handleOrderType(item)} className={`flex-1 text-sm px-4 py-2 rounded-lg font-sora font-medium capitalize ${orderType === item ? "bg-primary text-white" : "bg-background"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filters && (
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-sora font-medium text-center">
                Filter Options
            </h1>
            <div
            
            className="flex items-center justify-center gap-2 flex-wrap">
              {filters?.map((item, index) => (
                <button
               
                 
                  onClick={() => handleFilter(item)}
                  key={index}
                  className={`text-sm  px-4 py-2 rounded-full font-sora capitalize ${
                    filter === item
                      ? "bg-primary/10 text-primary font-medium"
                      : "bg-background text-sub"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default OrderFilter;
