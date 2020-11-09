import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(<>
    <CssBaseline/>
    <App/>
</>, app);
