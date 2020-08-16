import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import User from "../../models/users";
import AppRow from "../row/row";

class AppTable extends React.Component {
//global object part of every react component 
    state = {
        users: [],
        sortField: '',
        sortDir: 'asc',
        allusers: [],
    };

    //built in feature of react
    //once the comp mounts, it will do something
    //react components have a lifecycle 
    //once a component has finished doing x, do a certain thing 
    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=20&nat=us`)
            .then(res => {
                // if (res && res.data && res.data.results) const users = res.data.results;
                const users = res && res.data && res.data.results;
                if (!users || users.length === 0){
                    this.setState({loading: false});
                    return;
                }

                //go through the json data array, create user object based on that data 
                //returns an array of user objects 
                const userList = users.map(x => new User(x));
                this.setState({ allusers: userList, users: userList });
            })
    }

    onSort(sortField) {
        const currentSortField = this.state.sortField;
        const users = this.state.users;
        let sortDir = this.state.sortDir;
        if (currentSortField === sortField) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc'
            this.sortArray(users, sortField,sortDir);
        }else{
            sortDir = 'asc'
            this.sortArray(users, sortField,sortDir);
        }
        this.setState({users: users, sortDir: sortDir, sortField: sortField})
    }

    sortArray(objects, field, direction){
        if (direction === 'asc'){
            objects.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            // objects.sort(function(a,b) {
            //     if (a[field] > b[field]) {
            //         return 1;
            //     } 
            //     if (b[field] > a[field]) {
            //         return -1;
            //     } 
            //      return 0;
            // })
            return;
        }
        objects.sort((a,b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0));
    }

    doSearch(e) {
        const searchValue = e.target.value;
        const allUsers = this.state.allusers;
        if (!searchValue){
            this.setState({users: allUsers});
            return;
        }
        const filteredUsers = allUsers.filter((obj)=>{
            return Object.keys(obj).reduce((acc, curr)=>{
                return acc || obj[curr].toLowerCase().includes(searchValue);
            }, false);
        });
        this.setState({users: filteredUsers});
    }

    render() {
        const userObjects = this.state.users;
        return <Col>
            <Form inline className="mb-2">
                    <Form.Label className="my-1 mr-2">Search:</Form.Label>
                    <Form.Control type="text" onChange={event => this.doSearch(event)} placeholder="Search Table" />
            </Form>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className="pointer" onClick={() => this.onSort('firstName')}>First Name</th>
                    <th className="pointer" onClick={() => this.onSort('lastName')}>Last Name</th>
                    <th className="pointer" onClick={() => this.onSort('email')}>Email</th>
                    <th className="pointer" onClick={() => this.onSort('street')}>Street</th>
                    <th className="pointer" onClick={() => this.onSort('city')}>City</th>
                    <th className="pointer" onClick={() => this.onSort('state')}>State</th>
                    <th className="pointer" onClick={() => this.onSort('phone')}>Phone</th>
                </tr>
                </thead>
                <tbody>
                {userObjects.map((singleUser, index) => (
                    //pass parameters to a component
                    //parameters are available to components using props
                    //array map: going through an array 
                    //going through our user objects (when made into class) and putting in our body
                    <AppRow key={index} user={singleUser}/>
                ))}
                </tbody>
            </Table>
        </Col>;
    }
}

export default AppTable;
