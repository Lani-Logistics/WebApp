import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
const Subtitle = ({title, subtitle, link}: {title: string, subtitle?: string, link?: string}) => {
  return (
    <div className="py-4 flex items-center justify-between">
          <h2 className="font-medium text-main">{title}</h2>
          {subtitle && <Link to={link || ""} className="text-sm center gap-1 text-primary_1">
            {subtitle} <ChevronRight size={16} />
          </Link>}
        </div>
  )
}

export default Subtitle