function Greeting() {
  const name = "Saim Muhammad";
  return (
    <div className="greeting">
      <h2>Welcome, {name}!</h2>
      <p>Today is {new Date().toDateString()}</p>
    </div>
  );
}
export default Greeting;
