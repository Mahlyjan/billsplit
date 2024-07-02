import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Display.css";

type CalculatorValues = {
	// baseAmount: number;
	baseAmount: string;
	serviceCharge: number;
	govTax: number;
}
const Display = () => {
	const form = useForm<CalculatorValues>(
		{
		defaultValues: {
			baseAmount: "0",
			serviceCharge: 0,
			govTax: 0
		}
	}
	); // Renders an object. This is a react hook.

	const { register, watch, handleSubmit } = form;
	const watchAllFields = watch(); // watching everything when nothing is passed as argument.
	const [buttonClicked, setButtonClicked] = useState(false);
	const onCalculate = (data: CalculatorValues) => {
		console.log("Calculate button clicked!", data);
		setButtonClicked(true);
		if (data?.baseAmount) { //if true
			console.log(typeof eval(watchAllFields?.baseAmount));
		}

		//let x = eval("7.90 + 4.90/2")
		Number(watchAllFields?.baseAmount);
		console.log(eval(watchAllFields?.baseAmount));
	}


	const totalCostWithSvc: number = eval(watchAllFields?.baseAmount) + (eval(watchAllFields?.baseAmount) * (watchAllFields?.serviceCharge/100));
	console.log("totalCostWithSvc =", totalCostWithSvc);
	const totalCostAfterGst: number = Number(totalCostWithSvc + (totalCostWithSvc * (watchAllFields?.govTax/100)));
	const amountOwed = Number(totalCostAfterGst).toFixed(2);
	
	// Callback Function!
	// React.useEffect(() => {
  //   const subscription = watch((value, { name, type }) => console.log(value, name, type));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

	return (
		<>
			<Box className="main">
				<form onSubmit={handleSubmit(onCalculate)}>
					<Box className="body">
						<h1>Bill Split Calculator</h1>
						<Box className="questions">
							<p><b>How much do you owe?</b></p>
							<p>(Your input may be in the form of an equation)</p>
						</Box>
						<Box className="inputs">
							<TextField
								id="outlined-basic"
								variant="outlined"
								label="Amount Owed"
								{...register("baseAmount")} />
						</Box>
					</Box>
					<Box className="body">
						<Box className="questions">
							<p><b>Any service charge? (In percentage)</b></p>
						</Box>
						<Box className="inputs">
							<TextField
								id="outlined-basic"
								variant="outlined"
								label="Service Charge"
								{...register("serviceCharge")} /><b>%</b>
						</Box>
					</Box>
					<Box className="body">
						<Box className="questions">
							<p><b>Any Government Service Tax (GST)? (In percentage)</b></p>
						</Box>
						<Box className="inputs">
							<TextField
								id="outlined-basic"
								variant="outlined"
								label="GST"
								{...register("govTax")} /><b>%</b>
						</Box>
					</Box>
					<Box className="button">
						<Button variant="contained" type="submit">Calculate!</Button>
					</Box>
				</form>
				{buttonClicked ?
				<Box className="result-container">
					<h2 color="red"><b>You owe: ${amountOwed}</b></h2>
					<Box className="display-fields">
					<p>Base Amount: ${Number(eval(watchAllFields?.baseAmount)).toFixed(2)}</p>
					<p>Service Charge: {watchAllFields?.serviceCharge}%</p>
					<p>GST: {watchAllFields?.govTax}%</p>
					</Box>
				</Box> : <></>}
			</Box>

		</>
	)
}

export default Display;