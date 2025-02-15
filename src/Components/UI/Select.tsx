import { ChevronDown } from 'lucide-react'

const Select = ({label, name, value, onChange, options, error}: SelectProps) => {
  return (
    <div className="space-y-2">
    <label className="block text-sm font-medium text-sub">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-line
                  focus:border-primary bg-background text-main
                  appearance-none cursor-pointer pr-10 text-sm"
      >
        <option value="" disabled defaultValue={value}>Select a {name}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sub pointer-events-none"
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
  )
}

export default Select