exports.id = 949;
exports.ids = [949];
exports.modules = {

/***/ 791:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 8709, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2698, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7833, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 9150, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7734, 23))

/***/ }),

/***/ 3430:
/***/ (() => {



/***/ }),

/***/ 8732:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  I8: () => (/* binding */ auth_auth),
  ts: () => (/* binding */ getCurrentUser),
  B3: () => (/* binding */ signInUserWithEmailAndPassword),
  Mx: () => (/* binding */ signOutUser),
  YL: () => (/* binding */ signUpUserWithEmailAndPassword)
});

// EXTERNAL MODULE: ./node_modules/firebase/app/dist/index.mjs
var dist = __webpack_require__(1288);
// EXTERNAL MODULE: ./node_modules/firebase/auth/dist/index.mjs + 3 modules
var auth_dist = __webpack_require__(6124);
;// CONCATENATED MODULE: ./src/firebase/init.js


const firebaseConfig = {
    apiKey: "AIzaSyBiv02K9kTF4wEnVlOxMVB3UOWeC8fYh8c",
    authDomain: "games-77a98.firebaseapp.com",
    projectId: "games-77a98",
    storageBucket: "games-77a98.appspot.com",
    messagingSenderId: "230365643730",
    appId: "1:230365643730:web:f3bccb8238381e44a1fe0b"
};
const app = (0,dist/* initializeApp */.ZF)(firebaseConfig);
const auth = (0,auth_dist/* getAuth */.v0)(app);


;// CONCATENATED MODULE: ./src/firebase/auth.js


const auth_auth = (0,auth_dist/* getAuth */.v0)(app);
const getCurrentUser = async ()=>{
    const promisifiedOnAuthStateChanged = (auth)=>{
        return new Promise((resolve, reject)=>{
            auth.onAuthStateChanged((user)=>{
                if (user) {
                    resolve(user.uid);
                } else {
                    resolve(null);
                }
            });
        });
    };
    const uid = await promisifiedOnAuthStateChanged(auth_auth);
    return uid;
};
const signUpUserWithEmailAndPassword = async (email, password)=>{
    try {
        const userCredential = await (0,auth_dist/* createUserWithEmailAndPassword */.Xb)(auth_auth, email, password);
        console.log(userCredential.user);
        console.log(auth_auth);
    } catch (error) {
        console.log(error);
    }
};
const signInUserWithEmailAndPassword = async (email, password)=>{
    try {
        const userCredential = await (0,auth_dist/* signInWithEmailAndPassword */.e5)(auth_auth, email, password);
        console.log(userCredential.user);
    } catch (error) {
        console.log(error);
    }
};
const signOutUser = async ()=>{
    try {
        await (0,auth_dist/* signOut */.w7)(auth_auth);
    } catch (error) {
        console.log(error);
    }
};


/***/ }),

/***/ 6660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLayout),
/* harmony export */   metadata: () => (/* binding */ metadata)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6708);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5553);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_1__);



const metadata = {
    title: "Lista de Games",
    description: "Lista de games fornecida por api da App Masters"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("body", {
            className: (next_font_google_target_css_path_src_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_2___default().className),
            children: children
        })
    });
}


/***/ }),

/***/ 2819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3785);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 5553:
/***/ (() => {



/***/ })

};
;