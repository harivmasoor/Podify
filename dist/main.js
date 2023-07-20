/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// Define your Spotify API Client ID\nconst clientId = '0cd96f761ce9434b9b4278b664d87591';\nconst redirectUri = 'http://localhost:8080';\n\n// Handle the login button click event\ndocument.getElementById('loginButton').addEventListener('click', () => {\n  // Create the authorization URL\n  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;\n\n  // Redirect the user to the authorization URL\n  window.location.href = authUrl;\n});\n\n// Process the redirected URL after the user logs in\nwindow.addEventListener('load', () => {\n  const hash = window.location.hash.substr(1);\n  const hashParams = new URLSearchParams(hash);\n  if (hashParams.has('access_token')) {\n    // Access token is present in the URL\n    const accessToken = hashParams.get('access_token');\n    const tokenType = hashParams.get('token_type');\n    const expiresIn = hashParams.get('expires_in');\n\n    // Output the access token and other details\n    console.log({\n      access_token: accessToken,\n      token_type: tokenType,\n      expires_in: expiresIn\n    });\n\n    // Call additional functions or perform additional tasks here\n    getUserProfile(accessToken);\n  } else {\n    // Call additional functions or perform additional tasks here\n    // when the user is not logged in or access token is not present\n  }\n});\n\n// Function to fetch the user's profile information\nfunction getUserProfile(accessToken) {\n  const headers = {\n    Authorization: `Bearer ${accessToken}`,\n    'Content-Type': 'application/json'\n  };\n\n  // Make a GET request to the Spotify API\n  fetch('https://api.spotify.com/v1/me', {\n    headers: headers\n  }).then(response => response.json()).then(data => {\n    // Extract the username from the response data\n    const username = data.display_name;\n\n    // Render the username on the webpage\n    renderUsername(username);\n  }).catch(error => {\n    console.error('Error fetching user profile:', error);\n  });\n}\n\n// Function to render the username on the webpage\nfunction renderUsername(username) {\n  const usernameElement = document.getElementById('username');\n  usernameElement.textContent = username;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJuYW1lcyI6WyJjbGllbnRJZCIsInJlZGlyZWN0VXJpIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdXRoVXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaGFzaCIsInN1YnN0ciIsImhhc2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoYXMiLCJhY2Nlc3NUb2tlbiIsImdldCIsInRva2VuVHlwZSIsImV4cGlyZXNJbiIsImNvbnNvbGUiLCJsb2ciLCJhY2Nlc3NfdG9rZW4iLCJ0b2tlbl90eXBlIiwiZXhwaXJlc19pbiIsImdldFVzZXJQcm9maWxlIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwidXNlcm5hbWUiLCJkaXNwbGF5X25hbWUiLCJyZW5kZXJVc2VybmFtZSIsImNhdGNoIiwiZXJyb3IiLCJ1c2VybmFtZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCJdLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9kaWZ5Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVmaW5lIHlvdXIgU3BvdGlmeSBBUEkgQ2xpZW50IElEXG5jb25zdCBjbGllbnRJZCA9ICcwY2Q5NmY3NjFjZTk0MzRiOWI0Mjc4YjY2NGQ4NzU5MSc7XG5jb25zdCByZWRpcmVjdFVyaSA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAnO1xuXG4vLyBIYW5kbGUgdGhlIGxvZ2luIGJ1dHRvbiBjbGljayBldmVudFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIC8vIENyZWF0ZSB0aGUgYXV0aG9yaXphdGlvbiBVUkxcbiAgY29uc3QgYXV0aFVybCA9IGBodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZT9jbGllbnRfaWQ9JHtjbGllbnRJZH0mcmVzcG9uc2VfdHlwZT10b2tlbiZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RVcmkpfWA7XG5cbiAgLy8gUmVkaXJlY3QgdGhlIHVzZXIgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMXG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybDtcbn0pO1xuXG4vLyBQcm9jZXNzIHRoZSByZWRpcmVjdGVkIFVSTCBhZnRlciB0aGUgdXNlciBsb2dzIGluXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgY29uc3QgaGFzaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoaGFzaCk7XG5cbiAgaWYgKGhhc2hQYXJhbXMuaGFzKCdhY2Nlc3NfdG9rZW4nKSkge1xuICAgIC8vIEFjY2VzcyB0b2tlbiBpcyBwcmVzZW50IGluIHRoZSBVUkxcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGhhc2hQYXJhbXMuZ2V0KCdhY2Nlc3NfdG9rZW4nKTtcbiAgICBjb25zdCB0b2tlblR5cGUgPSBoYXNoUGFyYW1zLmdldCgndG9rZW5fdHlwZScpO1xuICAgIGNvbnN0IGV4cGlyZXNJbiA9IGhhc2hQYXJhbXMuZ2V0KCdleHBpcmVzX2luJyk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIGFjY2VzcyB0b2tlbiBhbmQgb3RoZXIgZGV0YWlsc1xuICAgIGNvbnNvbGUubG9nKHtcbiAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICB0b2tlbl90eXBlOiB0b2tlblR5cGUsXG4gICAgICBleHBpcmVzX2luOiBleHBpcmVzSW4sXG4gICAgfSk7XG5cbiAgICAvLyBDYWxsIGFkZGl0aW9uYWwgZnVuY3Rpb25zIG9yIHBlcmZvcm0gYWRkaXRpb25hbCB0YXNrcyBoZXJlXG4gICAgZ2V0VXNlclByb2ZpbGUoYWNjZXNzVG9rZW4pO1xuICB9IGVsc2Uge1xuICAgIC8vIENhbGwgYWRkaXRpb25hbCBmdW5jdGlvbnMgb3IgcGVyZm9ybSBhZGRpdGlvbmFsIHRhc2tzIGhlcmVcbiAgICAvLyB3aGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW4gb3IgYWNjZXNzIHRva2VuIGlzIG5vdCBwcmVzZW50XG4gIH1cbn0pO1xuXG4vLyBGdW5jdGlvbiB0byBmZXRjaCB0aGUgdXNlcidzIHByb2ZpbGUgaW5mb3JtYXRpb25cbmZ1bmN0aW9uIGdldFVzZXJQcm9maWxlKGFjY2Vzc1Rva2VuKSB7XG4gIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWAsXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfTtcblxuICAvLyBNYWtlIGEgR0VUIHJlcXVlc3QgdG8gdGhlIFNwb3RpZnkgQVBJXG4gIGZldGNoKCdodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZScsIHtcbiAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIC8vIEV4dHJhY3QgdGhlIHVzZXJuYW1lIGZyb20gdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gZGF0YS5kaXNwbGF5X25hbWU7XG5cbiAgICAgIC8vIFJlbmRlciB0aGUgdXNlcm5hbWUgb24gdGhlIHdlYnBhZ2VcbiAgICAgIHJlbmRlclVzZXJuYW1lKHVzZXJuYW1lKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB1c2VyIHByb2ZpbGU6JywgZXJyb3IpO1xuICAgIH0pO1xufVxuXG4vLyBGdW5jdGlvbiB0byByZW5kZXIgdGhlIHVzZXJuYW1lIG9uIHRoZSB3ZWJwYWdlXG5mdW5jdGlvbiByZW5kZXJVc2VybmFtZSh1c2VybmFtZSkge1xuICBjb25zdCB1c2VybmFtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKTtcbiAgdXNlcm5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gdXNlcm5hbWU7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsTUFBTUEsUUFBUSxHQUFHLGtDQUFrQztBQUNuRCxNQUFNQyxXQUFXLEdBQUcsdUJBQXVCOztBQUUzQztBQUNBQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDckU7RUFDQSxNQUFNQyxPQUFPLEdBQUksb0RBQW1ETCxRQUFTLHFDQUFvQ00sa0JBQWtCLENBQUNMLFdBQVcsQ0FBRSxFQUFDOztFQUVsSjtFQUNBTSxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHSixPQUFPO0FBQ2hDLENBQUMsQ0FBQzs7QUFFRjtBQUNBRSxNQUFNLENBQUNILGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO0VBQ3BDLE1BQU1NLElBQUksR0FBR0gsTUFBTSxDQUFDQyxRQUFRLENBQUNFLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUMzQyxNQUFNQyxVQUFVLEdBQUcsSUFBSUMsZUFBZSxDQUFDSCxJQUFJLENBQUM7RUFFNUMsSUFBSUUsVUFBVSxDQUFDRSxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUU7SUFDbEM7SUFDQSxNQUFNQyxXQUFXLEdBQUdILFVBQVUsQ0FBQ0ksR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUNsRCxNQUFNQyxTQUFTLEdBQUdMLFVBQVUsQ0FBQ0ksR0FBRyxDQUFDLFlBQVksQ0FBQztJQUM5QyxNQUFNRSxTQUFTLEdBQUdOLFVBQVUsQ0FBQ0ksR0FBRyxDQUFDLFlBQVksQ0FBQzs7SUFFOUM7SUFDQUcsT0FBTyxDQUFDQyxHQUFHLENBQUM7TUFDVkMsWUFBWSxFQUFFTixXQUFXO01BQ3pCTyxVQUFVLEVBQUVMLFNBQVM7TUFDckJNLFVBQVUsRUFBRUw7SUFDZCxDQUFDLENBQUM7O0lBRUY7SUFDQU0sY0FBYyxDQUFDVCxXQUFXLENBQUM7RUFDN0IsQ0FBQyxNQUFNO0lBQ0w7SUFDQTtFQUFBO0FBRUosQ0FBQyxDQUFDOztBQUVGO0FBQ0EsU0FBU1MsY0FBY0EsQ0FBQ1QsV0FBVyxFQUFFO0VBQ25DLE1BQU1VLE9BQU8sR0FBRztJQUNkQyxhQUFhLEVBQUcsVUFBU1gsV0FBWSxFQUFDO0lBQ3RDLGNBQWMsRUFBRTtFQUNsQixDQUFDOztFQUVEO0VBQ0FZLEtBQUssQ0FBQywrQkFBK0IsRUFBRTtJQUNyQ0YsT0FBTyxFQUFFQTtFQUNYLENBQUMsQ0FBQyxDQUNDRyxJQUFJLENBQUNDLFFBQVEsSUFBSUEsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2pDRixJQUFJLENBQUNHLElBQUksSUFBSTtJQUNaO0lBQ0EsTUFBTUMsUUFBUSxHQUFHRCxJQUFJLENBQUNFLFlBQVk7O0lBRWxDO0lBQ0FDLGNBQWMsQ0FBQ0YsUUFBUSxDQUFDO0VBQzFCLENBQUMsQ0FBQyxDQUNERyxLQUFLLENBQUNDLEtBQUssSUFBSTtJQUNkakIsT0FBTyxDQUFDaUIsS0FBSyxDQUFDLDhCQUE4QixFQUFFQSxLQUFLLENBQUM7RUFDdEQsQ0FBQyxDQUFDO0FBQ047O0FBRUE7QUFDQSxTQUFTRixjQUFjQSxDQUFDRixRQUFRLEVBQUU7RUFDaEMsTUFBTUssZUFBZSxHQUFHbkMsUUFBUSxDQUFDQyxjQUFjLENBQUMsVUFBVSxDQUFDO0VBQzNEa0MsZUFBZSxDQUFDQyxXQUFXLEdBQUdOLFFBQVE7QUFDeEMifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2RpZnkvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;