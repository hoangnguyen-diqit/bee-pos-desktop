import React from "react";

export class ComponentToPrint extends React.Component {

    render() {
        return (
            <table>
                <th>column 1</th>
                <th>column 2</th>
                <th>column 3</th>
                <tbody>
                <tr>
                    <td>data 1</td>
                    <td>data 2</td>
                    <td>data 3</td>
                </tr>
                <tr>
                    <td>data 1</td>
                    <td>data 2</td>
                    <td>data 3</td>
                </tr>
                <tr>
                    <td>data 1</td>
                    <td>data 2</td>
                    <td>data 3</td>
                </tr>
                </tbody>
            </table>
        );
    }
}
