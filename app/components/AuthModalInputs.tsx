interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

const AuthModalInputs = ({ inputs, handleChangeInput, isSignin }: Props) => {
  return (
    <div>
      {isSignin ? null : (
        <div className="my-3 justify-between text-sm">
          <input
            type="text"
            className="input border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="input border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastName}
            name="lastName"
            onChange={handleChangeInput}
          />
        </div>
      )}

      <div className="my-3 justify-between text-sm">
        <input
          type="text"
          className="input border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={handleChangeInput}
        />
      </div>
      {isSignin ? null : (
        <div className="my-3 justify-between text-sm">
          <input
            type="text"
            className="input border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            name="phone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="input border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            name="city"
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 justify-between text-sm">
        <input
          type="password"
          className="input border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          name="password"
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};
export default AuthModalInputs;
