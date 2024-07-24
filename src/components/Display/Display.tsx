import { ErrorMessage } from "@hookform/error-message";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Display.css";

type CalculatorValues = {
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

	const { register, handleSubmit, getValues, formState: { errors } } = form;
	const [submitClicked, setSubmitClicked] = useState(false);
	const [resetClicked, setResetClicked] = useState(false);
	const [values, setValues] = useState<CalculatorValues>({
		baseAmount: "0",
		serviceCharge: 0,
		govTax: 0
	});

	const onCalculate = (data: CalculatorValues) => {
		const callingValues = getValues();
		setValues(callingValues);
		setSubmitClicked(true);
		setResetClicked(false)
	}

	const totalCostWithSvc: number = eval(values?.baseAmount) + (eval(values?.baseAmount) * (values?.serviceCharge / 100));
	const totalCostAfterGst: number = Number(totalCostWithSvc + (totalCostWithSvc * (values?.govTax / 100)));
	const amountOwed = Number(totalCostAfterGst).toFixed(2);

	const handleResetButton = () => {
		setResetClicked(true);
		setSubmitClicked(false);
	}


	useEffect(() => {
		console.log("Check values: ", values);
		console.log("Submit button clicked:", submitClicked);
		console.log("Reset button clicked:", resetClicked);

	}, [values, submitClicked, resetClicked]);


	return (
		<>
			<Box className="main">
				<form onSubmit={handleSubmit(onCalculate)}>
					<Box className="body">
						<h1 className="title">Calculate-What-I-Owe</h1>
						<Box className="preface">
							<p>Tired of paying more than what you ordered when you dine in big groups?</p>
							<p>Say no more.</p>
							<p>With this tool, each individual can calculate and pay the exact amount they owe!</p>
							<p>Less stress, more savings, more fair.</p>
						</Box>
						<Box className="questions">
							<p><b>How much do you owe?</b></p>
							<p>(Your input may be in the form of an equation)</p>
						</Box>
						<Box className="inputs-container">
							<TextField
								id="outlined-basic"
								variant="outlined"
								label="Amount Owed"
								{...register("baseAmount", {
									pattern: {
										// value: /^([-+/*]\d+(\.\d+)?)*/g,
										value: /^[0-9+\-*/.^()]*$/g,
										message: "The above input only accepts numerics or a mathematical equation.\n\n Please also ensure there are no whitespaces in your equation."
									}
								})} />
						</Box>
						<ErrorMessage errors={errors} name="baseAmount" render={({ message }) => <div className="errorMessage"><p>{message}</p></div>} />
					</Box>
					<Box className="body">
						<Box className="questions">
							<p><b>Any service charge?</b></p>
						</Box>
						<Box className="inputs-container">
							<Box className="inner-inputs-container">
								<TextField
									id="outlined-basic"
									variant="outlined"
									label="Service Charge"
									{...register("serviceCharge", 
									{
										pattern: {
											value: /^[0-9]*$/g,
											message: "This input accepts number only."
										}
									}
									)} />
								<h2><b>%</b></h2>
							</Box>

							<ErrorMessage errors={errors} name="serviceCharge" render={({ message }) => <div className="errorMessage"><p>{message}</p></div>} />
						</Box>
					</Box>
					<Box className="body">
						<Box className="questions">
							<p><b>Any Government Service Tax (GST)?</b></p>
						</Box>
						<Box className="inputs-container">
							<Box className="inner-inputs-container">
							<TextField
								id="outlined-basic"
								variant="outlined"
								label="GST"
								{...register("govTax", 
								{
									pattern: {
										value: /^[0-9]*$/g,
										message: "This input accepts number only."
									}
								}
								)} />
							<h2><b>%</b></h2>
							</Box>
							<ErrorMessage errors={errors} name="govTax" render={({ message }) => <div className="errorMessage"><p>{message}</p></div>} />

						</Box>
					</Box>
					<Box className="buttons-container">

					</Box>
					<Box className="button">
						<Button variant="contained" type="submit">Calculate</Button>
					</Box>
					<Box className="button">
						<Button variant="contained" color="secondary" type="reset" onClick={handleResetButton}>Reset</Button>
					</Box>
				</form>
				{submitClicked ?
					<Box className="result-container">
						<h2 className="amount-owe-title"><b>You owe: ${amountOwed}</b></h2>
						<Box className="display-fields">
							<p>Base amount I owe: ${Number(eval(values?.baseAmount)).toFixed(2)}</p>
							<p>Service Charge: {values?.serviceCharge}%</p>
							<p>GST: {values?.govTax}%</p>
						</Box>
					</Box> : 
				resetClicked ? <></> : <></>}

			</Box>

		</>
	)
}

export default Display;