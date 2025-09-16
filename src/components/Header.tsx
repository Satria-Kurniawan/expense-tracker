import { MoveLeft } from "lucide-react"
import { Link } from "react-router"
import { Button } from "./ui/button"

export default function Header({
  title,
  actionButton,
  withBackButton = false,
  backPath = "/",
}: {
  title: string
  actionButton: React.ReactElement
  withBackButton?: boolean
  backPath?: string
}) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        {withBackButton && (
          <Link to={backPath}>
            <Button variant={"secondary"} size={"icon"} rounded={"full"}>
              <MoveLeft />
            </Button>
          </Link>
        )}
      </div>
      <h1 className="font-bold">{title}</h1>
      <div>{actionButton}</div>
    </header>
  )
}
