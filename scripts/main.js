(function main() {
	// 행렬의 모든 요소를 0으로 초기화하는 함수
	const initializeMatrix = matrix_object => {
		let matrix_array = [];
		for (let i = 0; i < matrix_object.rowLength; i++) {
			matrix_array.push([]);
			for (let j = 0; j < matrix_object.columnLength; j++) {
			matrix_array[i].push(0);
			}
		}
		return matrix_array;
	};

	// 행렬을 화면에 시각화하는 함수
	const displayMatrix = ( matrixes_id, matrix_object ) => {
		// result 행렬의 경우 3자리마다 콤마를 찍어주는 함수
		const formatResultArray = array => {
			const returnArray = array.map( row => {
				return row.map( value => {
					let valueStr = value.toString();
					if (valueStr.length > 3) {
						let formattedValue = "";
						let count = 0;
						for (let k = valueStr.length - 1; k >= 0; k--) {
							formattedValue = valueStr[k] + formattedValue;
							count++;
							if (count === 3 && k !== 0) {
								formattedValue = "," + formattedValue;
								count = 0;
							}
						}
						valueStr = formattedValue;
					}
					return valueStr;
				});
			});
			return returnArray;
		};

		let formattedArray = ( matrixes_id === "resultMatrix" ) ? formatResultArray(matrix_object.array) : matrix_object.array;
		document.querySelector(`#${matrixes_id} .displayArea`).innerHTML = formattedArray.map( row => {
			return `<div class='matrix_row'>${
				row.map( column => {
					switch (matrixes_id) {
						case "resultMatrix":
							return `<input type='text' class='matrix_column' value='${column}' readonly>`;
						default:
							return `<input type='number' class='matrix_column' value='${column}' min="0" max="99">`;
					}
				}).join("")
			}</div>`;
		}).join("");
	};

	// 행렬 설정 함수
	const setMatrixes = ( matrixes_id, matrix_object ) => {
		// 행렬 크기를 설정하는 함수
		const setMatrixSize = ( matrixes_id, matrix_object ) => {
			document.querySelector(`#${matrixes_id} .inputBox`).addEventListener("input", (evt) => {
				if (evt.target.type === "number") {
					if (evt.target.value >= 0 && evt.target.value <= 7) {
						switch (evt.target.className) {
							case "rows":
								matrix_object.rowLength = Number(evt.target.value);
								break;
							case "cols":
								matrix_object.columnLength = Number(evt.target.value);
								break;
						}
						document.querySelector(`#${matrixes_id} .rows`).value = matrix_object.rowLength;
						document.querySelector(`#${matrixes_id} .cols`).value = matrix_object.columnLength;
					} else {
						switch (evt.target.className) {
							case "rows":
								matrix_object.rowLength = 0;
								break;
							case "cols":
								matrix_object.columnLength = 0;
								break;
						}
						evt.target.value = 0;
					}
				}
			});
		};

		// Draw 버튼 클릭 이벤트 설정 함수
		const drawBtnClick = ( matrixes_id, matrix_object ) => {
			// 행렬을 업데이트하는 함수
			const updateMatrixObject = ( matrixes_id, matrix_object ) => {
				switch (matrixes_id) {
					case "firstMatrix":
						firstObj = { ...matrix_object };
						break;
					case "secondMatrix":
						secondObj = { ...matrix_object };
						break;
				}
			};
			
			// 행렬의 값을 설정하는 함수
			const setMatrixValue = (matrixes_id, matrix_object) => {
				for (let i = 0; i < matrix_object.array.length; i++) {
					for (let j = 0; j < matrix_object.array[i].length; j++) {
						const cell = document.querySelectorAll(`#${matrixes_id} .matrix_row`)[i].querySelectorAll(".matrix_column")[j];
						cell.value = matrix_object.array[i][j];
						cell.addEventListener("input", evt => {
							if (!(evt.target.value >= 0 && evt.target.value <= 99)) {
								evt.target.value = 0;
							}
							matrix_object.array[i][j] = Number(evt.target.value);
							evt.target.value = matrix_object.array[i][j];
							updateMatrixObject(matrixes_id, matrix_object);
						});
					}
				}
		  	};

			document.querySelector(`#${matrixes_id} .drawBtn`).addEventListener("click", () => {
				matrix_object.array = initializeMatrix(matrix_object);
				updateMatrixObject(matrixes_id, matrix_object);
				displayMatrix(matrixes_id, matrix_object);
				setMatrixValue(matrixes_id, matrix_object);
			});
		};

		setMatrixSize(matrixes_id, matrix_object);
		drawBtnClick(matrixes_id, matrix_object);
	};

	// 행렬 연산 함수
	const matrixCalculate = () => {
		// 행렬 합
		const calculationPlusMatrix = () => {
			if ( firstObj.array.length > 0 && firstObj.array[0].length > 0 && firstObj.array.length === secondObj.array.length && firstObj.array[0].length === secondObj.array[0].length ) {
				for (let i = 0; i < firstObj.array.length; i++) {
					for (let j = 0; j < firstObj.array[i].length; j++) {
						resultObj.array[i][j] = firstObj.array[i][j] + secondObj.array[i][j];
					}
				}
			} else {
				alertFailed( "행렬이 존재하지 않거나 크기가 다릅니다.", "행렬을 생성하거나 크기를 확인하십시오." );
			}
		};

		// 행렬 차
		const calculationMinusMatrix = () => {
			if ( firstObj.array.length > 0 && firstObj.array[0].length > 0 && firstObj.array.length === secondObj.array.length && firstObj.array[0].length === secondObj.array[0].length ) {
				for (let i = 0; i < firstObj.array.length; i++) {
					for (let j = 0; j < firstObj.array[i].length; j++) {
						resultObj.array[i][j] = firstObj.array[i][j] - secondObj.array[i][j];
					}
				}
			} else {
				alertFailed( "행렬이 존재하지 않거나 크기가 다릅니다.", "행렬을 생성하거나 크기를 확인하십시오." );
			}
		};

		// 행렬 곱
		const calculationTimesMatrix = () => {
			if ( firstObj.array.length > 0 && firstObj.array[0].length > 0 && firstObj.array[0].length === secondObj.array.length ) {
				let totalValue = 0;
				for (let i = 0; i < resultObj.rowLength; i++) {
					for (let j = 0; j < resultObj.columnLength; j++) {
						totalValue = 0;
						for (let k = 0; k < firstObj.columnLength; k++) {
						totalValue += firstObj.array[i][k] * secondObj.array[k][j];
						}
						resultObj.array[i][j] = totalValue;
					}
				}
			} else {
				alertFailed( "행렬이 존재하지 않거나 크기가 다릅니다.", "행렬을 생성하거나 크기를 확인하십시오." );
			}
		};

		document.querySelectorAll(".calculatorBtn .calculates .btns").forEach( calculateBtn => {
			calculateBtn.addEventListener("click", () => {
				resultObj = {
					...resultObj,
					rowLength: firstObj.rowLength,
					columnLength: secondObj.columnLength,
				};
				resultObj.array = initializeMatrix(resultObj);
				switch (calculateBtn.id) {
					case "plusBtn":
						calculationPlusMatrix();
						break;
					case "minusBtn":
						calculationMinusMatrix();
						break;
					case "timesBtn":
						calculationTimesMatrix();
						break;
				}
				displayMatrix("resultMatrix", resultObj);
			});
		});
	};

	// 경고창 함수
	const alertFailed = ( alertPara1, alertPara2 ) => {
		const alertParagraph1 = document.getElementById("alertParagraph1");
		const alertParagraph2 = document.getElementById("alertParagraph2");
		const alertCheck = document.getElementById("alertCheck");

		document.getElementById("alertFailedBox").classList.add("open");
		alertParagraph1.innerText = alertPara1;
		alertParagraph2.innerText = alertPara2;

		// 경고 글귀 초기화
		alertCheck.addEventListener("click", () => {
			document.getElementById("alertFailedBox").classList.remove("open");
			alertParagraph1.innerText = "";
			alertParagraph2.innerText = "";
		});

		
	};

	// 행렬 선택 및 변형
	const choiceMatrixAndOperation = () => {
		const matrix_operatings = () => {
			const matrixRandom = matrixes => {
			for (let i = 0; i < matrixes.length; i++) {
				for (let j = 0; j < matrixes[i].length; j++) {
					matrixes[i][j] = Math.floor(Math.random() * 100);
				}
			}
			};

			const matrixIdentity = matrixes => {
			for (let i = 0; i < matrixes.length; i++) {
				for (let j = 0; i < matrixes[i].length; j++) {
					matrixes[i][j] = i === j ? 1 : 0;
				}
			}
			};

			const matrixZero = matrixes => {
				for (let i = 0; i < matrixes.length; i++) {
					for (let j = 0; i < matrixes[i].length; j++) {
						matrixes[i][j] = 0;
					}
				}
			};

			const matrixTranspose = ( matrixes_id, matrix_object ) => {
				let tempMatrix = matrix_object.array;
				let transpose_matrix = [];
				for (let i = 0; i < matrix_object.columnLength; i++) {
					transpose_matrix.push([]);
					for (let j = 0; j < matrix_object.rowLength; j++) {
						transpose_matrix[i].push(tempMatrix[j][i]);
					}
				}
				matrix_object.rowLength = transpose_matrix.length;
				matrix_object.columnLength = transpose_matrix[0].length;
				matrix_object.array = transpose_matrix;
				displayMatrix(matrixes_id, matrix_object);
			};

			document.getElementById("doAction").addEventListener("click", () => {
				const matrixChoice = document.querySelector( "#choice_matrix .custom-select-trigger" ).dataset["value"];
				const actionChoice = document.querySelector( "#choice_action .custom-select-trigger" ).dataset["value"];

				let matrix_object = {};
				switch (matrixChoice) {
					case "firstMatrix":
						matrix_object = firstObj;
						break;
					case "secondMatrix":
						matrix_object = secondObj;
						break;
				}

				switch (actionChoice) {
					case "random":
						if ( matrix_object.array.length > 0 && matrix_object.array[0].length > 0 ) {
							matrixRandom(matrix_object.array);
							displayMatrix(matrixChoice, matrix_object);
						} else {
							alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
						}
						break;

					case "identity":
						if ( matrix_object.array.length > 0 && matrix_object.array[0].length > 0 && matrix_object.array.length === matrix_object.array[0].length ) {
							matrixIdentity(matrix_object.array);
							displayMatrix(matrixChoice, matrix_object);
						} else {
							alertFailed( "행렬이 존재하지 않거나 정사각행렬이 아닙니다.", "행렬을 생성하거나 크기를 확인하십시오." );
						}
						break;

					case "zero":
						if ( matrix_object.array.length > 0 && matrix_object.array[0].length > 0 ) {
							matrixZero(matrix_object.array);
							displayMatrix(matrixChoice, matrix_object);
						} else {
							alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
						}
						break;
						
					case "transpose":
						if ( matrix_object.array.length > 0 && matrix_object.array[0].length > 0 ) { 
							matrixTranspose(matrixChoice, matrix_object);
						} else {
							alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
						}
						break;

					default:
						displayMatrix(matrixChoice, matrix_object);
						break;
				}
			});
		};

		const customSelect = () => {
			document.querySelectorAll(".custom-select").forEach((select) => {
				const toggleSelect = () => {
					select.querySelector(".custom-select-trigger").addEventListener("click", evt => {
						evt.stopPropagation();
						select.querySelector(".custom-options").classList.toggle("open");
					});
				};

				const targetClassListAddSelected = () => {
					select.querySelectorAll(".custom-options .custom-option").forEach( option => {
						option.addEventListener("click", evt => {
							select.querySelectorAll(".custom-options .custom-option").forEach( opt => opt.classList.remove("selected"));
							evt.currentTarget.classList.add("selected");
							select.querySelector(".custom-select-trigger").textContent = evt.currentTarget.textContent;
							select.querySelector(".custom-select-trigger").dataset["value"] = evt.currentTarget.dataset["value"];
							select.querySelector(".custom-options").classList.remove("open");
						});
					});
				};
				
				toggleSelect();
				targetClassListAddSelected();
			});
		};

		matrix_operatings();
		customSelect();
	};

	// 변수 선언 및 초기화, 함수 실행
	let firstObj = {
		rowLength: 0,
		columnLength: 0,
		array: [],
	};

	let secondObj = {
		rowLength: 0,
		columnLength: 0,
		array: [],
	};

	let resultObj = {
		rowLength: 0,
		columnLength: 0,
		array: [],
	};

	setMatrixes("firstMatrix", firstObj);
	setMatrixes("secondMatrix", secondObj);
	choiceMatrixAndOperation();
	matrixCalculate();
})();
