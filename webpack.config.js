const path = require("path");
const {
    everythingInPackage,
    everythingInside,
    everythingOutside,
} = require("restrict-imports-loader");

module.exports = {
    mode: "development",
    entry: {
        "main": path.resolve(__dirname, "src", "index.ts"),
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".mjs", ".js", ".jsx" ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "awesome-typescript-loader", // or babel-loader etc
                    },
                    {
                        loader: "restrict-imports-loader",
                        options: {
                            severity: "error",
                            rules: [
                                {
                                    restricted: everythingInPackage("lodash"),
                                    severity: "warning", // Use "fatal" to stop compilation.
                                },
                                {
                                    info: "Imports from outside 'node_modules' or 'src' are not allowed. Please remove these imports:",
                                    restricted: everythingOutside([
                                        path.resolve(__dirname, "node_modules"),
                                        path.resolve(__dirname, "src"),
                                    ]),
                                },
                                {
                                    info: "Imports from 'src/bad' are not allowed. Please remove these imports:",
                                    restricted: everythingInside([
                                        path.resolve(__dirname, "src", "bad"),
                                    ]),
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    },
};
