const Button = ({ label, onClick, type = "primary" }) => {
    const baseStyle = "px-4 py-2 rounded font-semibold transition";
    const styles = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
      success: "bg-green-500 text-white hover:bg-green-600",
    };
  
    return (
      <button onClick={onClick} className={`${baseStyle} ${styles[type]}`}>
        {label}
      </button>
    );
  };
  
  export default Button;
  