import React, { useEffect, useState } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Col from 'react-bootstrap/Col';
import Courses_Search from './CourseSearch';
import axios from 'axios';

// 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileArrowUp, faUser, faStar, faTrophy, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
// import Card from 'react-bootstrap/Card';


const Course_Search = () => {
    let [courseDetails, setCourseDetails] = useState([]);
    let [SearchValues, setSearchValues] = useState({});
    const [selectedOptionCollege, setSelectedOptionCollege] = useState([]);
    const [selectedOptionDegree, setSelectedOptionDegree] = useState([]);
    const [selectedOptionUniversity, setSelectedOptionUniversity] = useState([]);
    const [selectedOptionProgrammeCourse, setSelectedOptionProgrammeCourse] = useState([]);


    const [optionsDegree, setoptionsDegree] = useState([]);
    const [optionsUniversity, setoptionsUniversity] = useState([]);
    const [optionsCollege, setoptionsCollege] = useState([]);
    const [optionsSubject, setoptionsSubject] = useState([]);
    const [optionsProgrammeCourse, setoptionsProgrammeCourse] = useState([]);

    const [optionsDegreeID, setoptionsDegreeID] = useState([]);
    const [optionsUniversityID, setoptionsUniversityID] = useState([]);
    const [optionsCollegeID, setoptionsCollegeID] = useState([]);
    const [optionsSubjectID, setoptionsSubjectID] = useState([]);
    const [optionsProgrammeCourseID, setoptionsProgrammeCourseID] = useState([]);

    const handleSelectionCollege = async (selected) => {

        setSelectedOptionCollege(selected);
        SearchValues.college = null;
        setSearchValues({...SearchValues});
        for(let key in optionsCollege){

            if(optionsCollege[key] == selected){
                SearchValues.college = optionsCollegeID[key];
                setSearchValues({...SearchValues});
            }
        }

    };

    const handleSelectionDegree = async (selected) => {

        setSelectedOptionDegree(selected);

        SearchValues.degree = null;
        setSearchValues({...SearchValues});
        // setSearchValues({degree: null});
        for(let key in optionsDegree){

            if(optionsDegree[key] == selected){
                SearchValues.degree = optionsDegreeID[key]
                setSearchValues({...SearchValues});
            }
        }
    };

    const handleSelectionUniversity = async (selected) => {

        setSelectedOptionUniversity(selected);
        SearchValues.university = null;
        setSearchValues({...SearchValues});
        for(let key in optionsUniversity){

            if(optionsUniversity[key] == selected){
                SearchValues.university = optionsUniversityID[key];
                setSearchValues({...SearchValues});
            }
        }
    };

    const handleSelectionCourse = async (selected) => {

        setSelectedOptionProgrammeCourse(selected);
        SearchValues.course = null;
        setSearchValues({...SearchValues});
        for(let key in optionsProgrammeCourse){

            if(optionsProgrammeCourse[key] == selected){
                SearchValues.course = optionsProgrammeCourseID[key];
                setSearchValues({...SearchValues});
            }
        }
    };

    const getResult = async () => {
        console.log("SearchValues", SearchValues)

        var searchBy = {};
        if(SearchValues.course){
            searchBy.course = {id: SearchValues.course}
        }
        if(SearchValues.college){
            searchBy.college = {id: SearchValues.college}
        }
        if(SearchValues.degree){
            searchBy.degree = {id: SearchValues.degree}
        }
        if(SearchValues.university){
            searchBy.university = {id: SearchValues.university}
        }

        await axios.post(`http://68.178.172.171:8282/besst-0.0.1-SNAPSHOT/search`, searchBy)
        .then((response) => {
            console.log("response", response.data)
            setCourseDetails(response.data.data);
        })
        .catch((error) =>{
            setCourseDetails([]);
            console.log("Get Courses Error", error)
        });
    }

    const getDetails = async () => {
        await axios.get(`http://68.178.172.171:8282/besst-0.0.1-SNAPSHOT/search`)
            .then((response) => {
                console.log("response", response.data)

                // college
                var collegename = [];
                var collegeId = [];
                response.data?.data[0]?.College.forEach(element => {
                    collegename.push(element.value);
                    collegeId.push(element.id);

                });


                setoptionsCollege(collegename);
                setoptionsCollegeID(collegeId);

                // Degree
                var degreename = [];
                var degreeId = [];
                response.data?.data[0]?.Degree.forEach(element => {
                    degreename.push(element.value);
                    degreeId.push(element.id);

                });


                setoptionsDegree(degreename);
                setoptionsDegreeID(degreeId);

                // Programs
                var programname = [];
                var programId = [];
                response.data?.data[0]?.Programs.forEach(element => {
                    programname.push(element.value);
                    programId.push(element.id);

                });


                setoptionsProgrammeCourse(programname);
                setoptionsProgrammeCourseID(programId);


                //university
                var universityname = [];
                var universityId = [];
                response.data?.data[0]?.University.forEach(element => {
                    universityname.push(element.value);
                    universityId.push(element.id);

                });
                setoptionsUniversity(universityname);
                setoptionsUniversityID(universityId);


                console.log(optionsCollege);
                // setIntroPlatform(response.data);
            })
            .catch((error) => {
                console.log("error intro", error)
            });
    }

    useEffect(() => {
        getDetails();
    }, [])





    return (
        <Container fluid className=" padding_b_15px" id='cour_form'>
            <Col md={11} sm={11} xs={11} className='align_center'>
                <h4 className='Course-tag'>What Are you looking for ?</h4>
                <Row className='Course-form '>
                    <Col md={3} sm={12} xs={12} >
                        <h6 className='cor--head'>Degree</h6>
                        <Typeahead
                            id='course_auto'
                            labelKey="degree"
                            options={optionsDegree}
                            placeholder='Enter or Select Course'
                            onChange={handleSelectionDegree}
                            selected={selectedOptionDegree}
                        />
                    </Col>

                    <Col md={4} sm={12} xs={12}>
                        <h6 className='cor--head'>University</h6>
                        <Typeahead
                            id='university_auto'
                            labelKey="university"
                            options={optionsUniversity}
                            placeholder='Enter or Select University'
                            onChange={handleSelectionUniversity}
                            selected={selectedOptionUniversity}
                        />
                    </Col>

                    <Col md={5} sm={12} xs={12}>
                        <h6 className='cor--head'>College</h6>
                        <Typeahead
                            id='autocomplete'
                            labelKey="College"
                            options={optionsCollege}
                            placeholder='Enter or Select College'
                            onChange={handleSelectionCollege}
                            selected={selectedOptionCollege}
                        />
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <h6 className='cor--head'>Subject</h6>
                        <Typeahead
                            id='university_auto'
                            labelKey="university"
                            options={optionsUniversity}
                            placeholder='Enter Subject'
                            onChange={handleSelectionUniversity}
                            selected={selectedOptionUniversity}
                        />
                    </Col>
                    <Col md={6} sm={12} xs={12} >
                        <h6 className='cor--head'> Programme/course</h6>
                        <Typeahead
                            id='autocomplete'
                            labelKey="Programme/course"
                            options={optionsProgrammeCourse}
                            placeholder='Enter Or Select Programme/course'
                            onChange={handleSelectionCourse}
                            selected={selectedOptionProgrammeCourse}
                        />
                    </Col>
                    <Col>
                        <button className='button-cor' onClick={getResult}>Search </button>
                    </Col>


                </Row>
            </Col>
            <Courses_Search CourseData={courseDetails} />
        </Container>
    );
};

// showig cards from Course Form

export default Course_Search;

