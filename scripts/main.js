(function main() {
	/**
	 * @function initializeMatrix
	 * @param {Object} matrix_object - 행렬 객체
	 * @returns {Array} - 0으로 초기화된 행렬
	 * @description - 행렬 객체의 행과 열 길이를 받아 0으로 초기화된 행렬을 반환하는 함수 
	 */
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

	/**
	 * @function displayMatrix
	 * @param {String} matrixes_id - 행렬 div의 id
	 * @param {Object} matrix_object - 행렬 객체
	 * @description 행렬을 화면에 시각화하는 함수
	 * @returns {void}
	 */
	const displayMatrix = ( matrixes_id, matrix_object ) => {
		/**
		 * @param {Array} array - 행렬
		 * @returns {Array} - 3자리마다 콤마가 찍힌 행렬
		 * @description - 행렬의 각 요소에 3자리마다 콤마를 찍어 반환하는 함수
		 */
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

		let formattedArray = [];
		switch (matrixes_id) {
			case "resultMatrix":
				formattedArray = formatResultArray(matrix_object.array);
				break;

			default:
				formattedArray = matrix_object.array;
				break;
		}
		
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
	
	/**
	 * @function updateMatrixObject
	 * @param {String} matrixes_id - 행렬 div의 id
	 * @param {Object} matrix_object - 행렬 객체
	 * @description parameter matrix_object의 값을 행렬 객체로 업데이트
	 * @returns {void}
	 */
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

	/**
	 * @function setMatrixValue
	 * @param {String} matrixes_id - 행렬 div의 id
	 * @param {Object} matrix_object - 행렬 객체
	 * @description input 이벤트를 통해 행렬의 모든 요소의 값을 설정하고, 행렬 객체를 업데이트
	 * @returns {void}
	*/
	const setMatrixValue = (matrixes_id, matrix_object) => {
		for (let i = 0; i < matrix_object.rowLength; i++) {
			for (let j = 0; j < matrix_object.columnLength; j++) {
				const cell = document.querySelectorAll(`#${matrixes_id} .matrix_row`)[i].querySelectorAll(".matrix_column")[j];
				cell.value = matrix_object.array[i][j];
				cell.addEventListener("input", evt => {
					console.log(evt.target.value);
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

	/**
	 * @function setMatrixes
	 * @param {String} matrixes_id - 행렬 div의 id
	 * @param {Object} matrix_object - 행렬 객체
	 * @description inputBox의 input이벤트를 통해 행렬의 크기를 설정하고, Draw 버튼 클릭 이벤트를 설정하는 함수
	 * @returns {void}
	 */
	const setMatrixes = ( matrixes_id, matrix_object ) => {
		/**
		 * @function setMatrixSize
		 * @param {String} matrixes_id - 행렬 div의 id
		 * @param {Object} matrix_object - 행렬 객체
		 * @description inputBox의 input 이벤트를 통해 행렬의 크기를 설정
		 * @returns {void}
		 */
		const setMatrixSize = ( matrixes_id, matrix_object ) => {
			document.querySelector(`#${matrixes_id} .inputBox`).addEventListener("input", (evt) => {
				if (evt.target.type === "number") {
					if ( !( evt.target.value >= 0 && evt.target.value <= 7 ) ) {
						switch (evt.target.className) {
							case "rows":
								matrix_object.rowLength = 0;
								break;
							case "cols":
								matrix_object.columnLength = 0;
								break;
						}
						evt.target.value = 0;
						return;
					}

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
				}
			});
		};
		
		/**
		 * @function drawBtnClick
		 * @param {String} matrixes_id - 행렬 div의 id
		 * @param {Object} matrix_object - 행렬 객체
		 * @description Draw 버튼 클릭 이벤트를 통해 설정
		 */
		const drawBtnClick = ( matrixes_id, matrix_object ) => {
			document.querySelector(`#${matrixes_id} .drawBtn`).addEventListener("click", () => {
				if( matrix_object.rowLength === 0 || matrix_object.columnLength === 0 ) {
					alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
					return;
				}
				// 행렬 초기화
				matrix_object.array = initializeMatrix(matrix_object);
				// 행렬 업데이트
				updateMatrixObject(matrixes_id, matrix_object);
				// 행렬 화면에 표시
				displayMatrix(matrixes_id, matrix_object);
				// 행렬의 모든 요소의 값을 설정
				setMatrixValue(matrixes_id, matrix_object);
			});
		};

		// 행렬의 크기 설정
		setMatrixSize(matrixes_id, matrix_object);
		// Draw 버튼 클릭 이벤트 설정
		drawBtnClick(matrixes_id, matrix_object);
		// 행렬의 모든 요소의 값을 설정
		setMatrixValue(matrixes_id, matrix_object);
	};

	/**
	 * @function matrixCalculate
	 * @description 행렬의 합, 차, 곱을 계산하는 함수
	 * @returns {void}
	 */
	const matrixCalculate = () => {
		/**
		 * @function calculationPlusMatrix
		 * @description 행렬의 합을 계산하는 함수
		 * @description 행렬이 존재하지 않거나 크기가 다를 경우 경고창을 띄우고 함수 종료
		 * @returns {void}
		*/
		const calculationPlusMatrix = () => {
			if ( !( firstObj.rowLength > 0 && firstObj.columnLength > 0 && firstObj.rowLength === secondObj.rowLength && firstObj.columnLength === secondObj.columnLength ) ) {
				alertFailed( "행렬이 존재하지 않거나 크기가 다릅니다.", "행렬을 생성하거나 크기를 확인하십시오." );
				return;
			};

			resultObj.array = initializeMatrix(resultObj);
			for (let i = 0; i < resultObj.rowLength; i++) {
				for (let j = 0; j < resultObj.columnLength; j++) {
					resultObj.array[i][j] = firstObj.array[i][j] + secondObj.array[i][j];
				}
			}
		}
		
		/**
		 * @function calculationMinusMatrix
		 * @description 행렬의 차를 계산하는 함수
		 * @description 행렬이 존재하지 않거나 크기가 다를 경우 경고창을 띄우고 함수 종료
		 * @returns {void}
		*/
		const calculationMinusMatrix = () => {
			if ( !( firstObj.rowLength > 0 && firstObj.columnLength > 0 && firstObj.rowLength === secondObj.rowLength && firstObj.columnLength === secondObj.columnLength ) ) {
				alertFailed( "행렬이 존재하지 않거나 크기가 다릅니다.", "행렬을 생성하거나 크기를 확인하십시오." );
				return;
			};

			resultObj.array = initializeMatrix(resultObj);
			for (let i = 0; i < firstObj.rowLength; i++) {
				for (let j = 0; j < firstObj.columnLength; j++) {
					resultObj.array[i][j] = firstObj.array[i][j] - secondObj.array[i][j];
				}
			}
		};
		
		/**
		 * @function calculationTimesMatrix
		 * @description 행렬의 곱을 계산하는 함수
		 * @description 행렬이 존재하지 않거나 크기가 다를 경우 경고창을 띄우고 함수 종료
		 * @returns {void}
		 */
		const calculationTimesMatrix = () => {
			if ( !( firstObj.rowLength > 0 && firstObj.columnLength > 0 && firstObj.columnLength === secondObj.rowLength ) ) {
				alertFailed( "행렬이 존재하지 않거나 크기가 다릅니다.", "행렬을 생성하거나 크기를 확인하십시오." );
				return;
			}
			let totalValue = 0;

			resultObj.array = initializeMatrix(resultObj);
			for (let i = 0; i < resultObj.rowLength; i++) {
				for (let j = 0; j < resultObj.columnLength; j++) {
					totalValue = 0;
					for (let k = 0; k < firstObj.columnLength; k++) {
					totalValue += firstObj.array[i][k] * secondObj.array[k][j];
					}
					resultObj.array[i][j] = totalValue;
				}
			}
		} 

		/* 
			* @description 행렬 연산 버튼 클릭 이벤트 설정
			* @description 행렬의 합, 차, 곱을 계산하고 결과 행렬을 화면에 표시
		*/
		document.querySelectorAll(".calculatorBtn .calculates .btns").forEach( calculateBtn => {
			calculateBtn.addEventListener("click", () => {
				resultObj = {
					...resultObj,
					rowLength: firstObj.rowLength,
					columnLength: secondObj.columnLength,
				};
				
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

	/**
	 * @function alertFailed
	 * @param {String} alertPara1 - 경고창 첫 번째 문구
	 * @param {String} alertPara2 - 경고창 두 번째 문구
	 * @description 경고창을 띄우는 함수
	 * @description 경고창을 띄우고 확인 버튼 클릭 시 경고창을 닫는다.
	 * @returns {void}
	*/
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
		/**
		 * @function matrix_operatings
		 * @description 행렬의 랜덤, 단위, 0행렬로 설정 및 전치행렬을 구하는 함수
		 * @description 행렬이 존재하지 않을 경우 경고창을 띄우고 함수 종료
		 * @returns {void}
		*/
		const matrix_operatings = () => {
			/**
			 * @function matrixRandom
			 * @param {Array} matrixes - 행렬
			 * @description 행렬의 모든 요소를 0부터 99까지의 랜덤한 정수로 설정하는 함수
			 * @description 행렬이 존재하지 않을 경우 경고창을 띄우고 함수 종료
			 * @returns {void}
			 */
			const matrixRandom = matrixes => {
			for (let i = 0; i < matrixes.length; i++) {
				for (let j = 0; j < matrixes[i].length; j++) {
					matrixes[i][j] = Math.floor(Math.random() * 100);
				}
			}
			};

			/**
			 * @function matrixIdentity
			 * @param {Array} matrixes - 행렬
			 * @description 행렬을 단위행렬로 설정하는 함수
			 * @description 행렬이 존재하지 않거나 정사각행렬이 아닐 경우 경고창을 띄우고 함수 종료
			 * @returns {void}
			*/
			const matrixIdentity = matrixes => {
				for (let i = 0; i < matrixes.length; i++) {
					for (let j = 0; j < matrixes[i].length; j++) {
						matrixes[i][j] = i === j ? 1 : 0;
					}
				}
			};

			/**
			 * @function matrixZero
			 * @param {Array} matrixes - 행렬
			 * @description 행렬을 0으로 설정하는 함수
			 * @description 행렬이 존재하지 않을 경우 경고창을 띄우고 함수 종료
			 * @returns {void}
			*/
			const matrixZero = matrixes => {
				for (let i = 0; i < matrixes.length; i++) {
					for (let j = 0; j < matrixes[i].length; j++) {
						matrixes[i][j] = 0;
					}
				}
			};

			/**
			 * @function matrixTranspose
			 * @param {String} matrixes_id - 행렬 div의 id
			 * @param {Object} matrix_object - 행렬 객체
			 * @description 행렬을 전치행렬로 설정하는 함수
			 * @description 행렬이 존재하지 않을 경우 경고창을 띄우고 함수 종료
			 * @returns {void}
			*/
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

			/**
			 * @function doAction
			 * @description 행렬 변형 버튼 클릭 이벤트 설정
			 * @description matrixChoice와 actionChoice에 따라 행렬을 선택, 그 행렬을 어떻게 변형할지 선택
			 * @description 행렬의 랜덤, 단위, 0행렬로 설정 및 전치행렬을 구하고 결과 행렬을 화면에 표시
			 * @description 행렬이 존재하지 않거나 조건에 맞지 않을 경우 경고창을 띄우고 함수 종료
			 * @returns {void}
			*/
			(function doAction() {
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
							if ( !( matrix_object.rowLength > 0 && matrix_object.columnLength > 0 ) ) {
								alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
								return;
							}
							matrixRandom(matrix_object.array);
							break;
	
						case "identity":
							if ( !( matrix_object.rowLength > 0 && matrix_object.columnLength > 0 && matrix_object.rowLength === matrix_object.columnLength ) ) {
								alertFailed( "행렬이 존재하지 않거나 정사각행렬이 아닙니다.", "행렬을 생성하거나 크기를 확인하십시오." );
								return;
							}
							matrixIdentity(matrix_object.array);
							break;
	
						case "zero":
							if ( !( matrix_object.rowLength > 0 && matrix_object.columnLength > 0 ) ) {
								alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
								return;
							}
							matrixZero(matrix_object.array);
							break;
							
						case "transpose":
							if ( !( matrix_object.rowLength > 0 && matrix_object.columnLength > 0 ) ) { 
								alertFailed("행렬이 존재하지 않습니다.", "행렬을 생성하십시오.");
								return;
							}
							matrixTranspose(matrixChoice, matrix_object);
							break;
	
						default:
							break;
					}
	
					// 행렬 시각화
					displayMatrix(matrixChoice, matrix_object);
					
					// 행렬의 모든 요소의 값을 설정
					setMatrixValue(matrixChoice, matrix_object);
				});
			})();
		};


		/**
		 * @function customSelect
		 * @description custom-select-trigger 클릭 이벤트 설정
		 * @description custom-option 클릭 이벤트 설정
		 * @returns {void}
		 * @description custom-select-trigger 클릭 시 custom-options-wrapper의 open 클래스 토글
		 * @description custom-option 클릭 시 custom-option의 selected 클래스 토글
		 * @description custom-select-trigger의 텍스트와 data-value 설정
		 * @description custom-options-wrapper의 open 클래스 제거
		*/
		const customSelect = () => {
			document.querySelectorAll(".custom-select").forEach( select => {
				/**
				 * @function toggleSelect
				 * @description custom-select-trigger 클릭 이벤트 설정
				 * @description custom-options-wrapper의 open 클래스 토글
				 * @returns {void}
				 */
				const toggleSelect = () => {
					select.querySelector(".custom-select-trigger").addEventListener("click", evt => {
						evt.stopPropagation();
						select.querySelector(".custom-options-wrapper").classList.toggle("open");
					});
				};

				/**
				 * @function targetClassListAddSelected
				 * @description custom-option 클릭 이벤트 설정
				 * @description custom-option의 selected 클래스 토글
				 * @description custom-select-trigger의 텍스트와 data-value 설정
				 * @description custom-options-wrapper의 open 클래스 제거
				 * @returns {void}
				*/
				const targetClassListAddSelected = () => {
					select.querySelectorAll(".custom-options .custom-option").forEach( option => {
						option.addEventListener("click", evt => {
							select.querySelectorAll(".custom-options .custom-option").forEach( opt => opt.classList.remove("selected"));
							evt.currentTarget.classList.add("selected");
							select.querySelector(".custom-select-trigger").textContent = evt.currentTarget.textContent;
							select.querySelector(".custom-select-trigger").dataset["value"] = evt.currentTarget.dataset["value"];
							select.querySelector(".custom-options-wrapper").classList.remove("open");
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