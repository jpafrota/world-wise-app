import { useNavigate } from "react-router";
import Button from "@/components/Button/Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate("/app/cities", { replace: true });
      }}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
