import React, { useEffect, useState } from 'react'
import {
    Container,
    Table,
    Button,
    Form,
    Card,
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faEdit } from "@fortawesome/free-solid-svg-icons"

import { useParams } from 'react-router-dom'
import { RecordAPI } from '../../api/record/record.api'

import './record.css'
import RecordEditModal from './RecordEditModal'


function Record() {
    const { record_id }: any = useParams()

    const [ modal, setModal ] = useState( false )
    const [ title, setTitle ] = useState( '' )
    const [ routineDate, setRoutineDate ] = useState( '...' )

    // Exercises data
    const [ data, setData ] = useState<any[]>( [] )
    const [ complete, setComplete ] = useState<number[]>( [] )

    const [ editData, setEditData ] = useState<any>( {
        ID: -1,
        exercise_id: -1,
        set_number: 0,
        weight: 0,
        reps: 0,
        max_reps: 0,
        rir: 0,
        rest_minute: 0,
        rest_second: 0,
    } )


    // Use effect..
    useEffect( () => {

        RecordAPI.getRecordWithBlock( record_id ).then( response => {
            const {
                block_block_title,
                date_routine_date,
                exercises
            } = response.data

            setRoutineDate( date_routine_date )
            setTitle( block_block_title )

            // Set exercises.
            setData( exercises )
        } )

    }, [ record_id ] )


    /**
     * Open edit modal popover.
     * @param data 
     */
    const handleEdit = ( data: any ) => {
        setModal( true )

        const { ID, exercise_id, set_number, set_weight, set_reps, set_max_reps, set_disable_range, set_rir, set_rest } = data

        const set_rest_minute = Math.floor( set_rest / 60 )
        const set_rest_second = set_rest - ( set_rest_minute * 60 )

        setEditData( {
            ID: ID,
            exercise_id: exercise_id,
            set_number: set_number,
            set_weight: Number( set_weight ),
            set_reps: set_reps,
            set_max_reps: set_max_reps,
            set_disable_range: set_disable_range,
            set_rir: set_rir,
            set_rest_minute: set_rest_minute,
            set_rest_second: set_rest_second
        } )
    }

    const handleComplete = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { value, checked } = e.target

        if ( checked ) setComplete( [ ...complete, Number( value ) ] )

        else {
            const index = complete.indexOf( Number( value ) )

            complete.splice( index, 1 )

            setComplete( [ ...complete ] )
        }
    }

    const updateEditData = ( update: any ) => {
        setEditData( {
            ...editData,
            ...update
        } )
    };

    const updateExerciseData = ( update: any ) => {
        const updateData = data.map( ( exercise: any ) => {
            if ( exercise.ID === update.exercise_id ) {
                const sets = exercise.sets.map( ( set: any ) => set.ID === update.ID ? { ...set, ...update } : set )

                return {
                    ...exercise,
                    sets: sets
                }
            }
            else return exercise
        } )

        setData( updateData )
    }


    return (
        <>
            <div className="record-date">
                <Container>
                    <h2 className="record-date-title">
                        <strong>(토)</strong><span>{ title }</span>
                    </h2>
                    <p className="record-date-desc">
                        {
                            ( ( date ) => {
                                const split = date.split( '/' )

                                return `${split[ 0 ]}년 ${split[ 1 ]}월 ${split[ 2 ]}일`
                            } )( routineDate )
                        }
                    </p>
                </Container>
            </div>

            <main className="main record-main">
                <Container>
                    { data.map( ( item, index ) => {
                        return (
                            <Card className="record-item" key={ index }>
                                <Card.Header>
                                    <div className="record-item-header">
                                        <h4>
                                            <FontAwesomeIcon icon={faBurn} style={{color: '#dc3545'}} />&nbsp;&nbsp;
                                            { item.exercise_name }
                                        </h4>
                                    </div>
                                </Card.Header>
                                <Card.Body className="no padding">
                                    <Table className="record-item-table no margin text align center">
                                        <tbody>
                                            { item.sets.map( ( set: any, set_index: number ) => {
                                                const completeClass = complete.indexOf( set.ID ) < 0 ? '' : 'record-item-complete-set'

                                                return (
                                                    <tr key={ set_index } className={ completeClass }>
                                                        <td className="vertical align middle">
                                                            <div className="vertical align middle display inline block">
                                                                <Form.Check type="checkbox" name="complete" id={ `complete-${set.ID}` } onChange={ handleComplete } value={ set.ID } />
                                                            </div>&nbsp;
                                                            <div className="record-item-set-title vertical align middle display inline block">
                                                                <Form.Label htmlFor={ `complete-${set.ID}` } className="no margin">
                                                                    { set.set_number }세트
                                                                </Form.Label>
                                                            </div>
                                                        </td>
                                                        <td className="vertical align middle">{ Number( set.set_weight ) }kg</td>
                                                        <td className="vertical align middle">{ set.set_reps }{ set.set_disable_range ? '' : `~${set.set_max_reps}` }회</td>
                                                        <td className="vertical align middle">{ set.set_rir }RIR</td>
                                                        <td className="vertical align middle">
                                                            { ( ( rest ) => {
                                                                const minute = Math.floor( rest / 60 )
                                                                const second = rest - ( minute * 60 )

                                                                return `${minute}분 ${second}초`
                                                            } )( set.set_rest ) }
                                                        </td>
                                                        <td className="vertical align middle">
                                                            <Button variant="link" title="수정하기" onClick={ () => { handleEdit( set ) } }>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            } ) }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        )
                    } ) }
                    
                </Container>

                <RecordEditModal
                    modal={ modal }
                    setModal={ setModal }
                    data={ editData }
                    updateEditData={ updateEditData }
                    updateExerciseData={ updateExerciseData }
                />
            </main>
        </>
    )
}

export default Record