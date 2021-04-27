import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Container,
    Table,
    Button,
    Form,
    Card,
    Col,
    Row
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faEdit, faBan, faDumbbell } from "@fortawesome/free-solid-svg-icons"

import { useParams } from 'react-router-dom'
import { RecordAPI } from '../../api/record/record.api'

import './record.css'
import RecordEditModal from './RecordEditModal'
import { RecordItemCompleteDTO } from '../../api/record/dto/record.item.complete.dto'


function Record() {
    const history = useHistory()
    const { record_id }: any = useParams()

    const [ modal, setModal ] = useState( false )
    const [ blockId, setBlockId ] = useState( -1 )
    const [ title, setTitle ] = useState( '' )
    const [ routineDate, setRoutineDate ] = useState( '...' )

    // Exercises data
    const [ data, setData ] = useState<any[]>( [] )
    const [ complete, setComplete ] = useState<number[]>( [] )

    const [ editData, setEditData ] = useState<any>( {
        ID: -1,
        record_item_id: -1,
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
                exercises,
                block_ID
            } = response.data

            setBlockId( block_ID )

            setRoutineDate( date_routine_date )
            setTitle( block_block_title )

            // Get record item and update sets in data..
            RecordAPI.getRecordItemsByRecordId( record_id ).then( response => {
                const { data } = response
                const recordCompleteArr: number[] = []

                // Exercises data
                const updateExercises = exercises.map( ( exercise: any ) => {
                    // Sets in exercise data
                    const updateSets = exercise.sets.map( ( set: any ) => {
                        let updateSet = set

                        // Record item data
                        data.forEach( ( item: any ) => {
                            const set_id = Number( item.set_id )

                            if ( set_id === updateSet.ID ) {
                                // Record item data
                                const {
                                    ID,
                                    set_id,
                                    record_id,
                                    record_item_disable_range,
                                    record_item_number,
                                    record_item_max_reps,
                                    record_item_reps,
                                    record_item_rest,
                                    record_item_rir,
                                    record_item_weight,
                                    record_item_complete,
                                    record_item_set_disable,
                                } = item

                                // Block set data
                                const {
                                    exercise_id,
                                } = updateSet

                                // Rendering data
                                updateSet = {
                                    ID: Number( set_id ),
                                    exercise_id: exercise_id,
                                    set_disable_range: record_item_disable_range,
                                    set_number: record_item_number,
                                    set_max_reps: record_item_max_reps,
                                    set_reps: record_item_reps,
                                    set_rest: record_item_rest,
                                    set_rir: record_item_rir,
                                    set_weight: record_item_weight,
                                    record_id: Number( record_id ),
                                    record_item_id: Number( ID ),
                                    record_item_complete: record_item_complete,
                                    record_item_set_disable: record_item_set_disable,
                                }

                                // Complete record..
                                if ( record_item_complete ) recordCompleteArr.push( Number( set_id ) )
                            }
                        } )

                        return updateSet
                    } )

                    return {
                        ...exercise,
                        sets: updateSets
                    }
                } )

                // Set exercises.
                setData( updateExercises )
                setComplete( recordCompleteArr )
            } )
        } )

    }, [ record_id ] )


    /**
     * Open edit modal popover.
     * @param data 
     */
    const handleEdit = ( data: any ) => {
        setModal( true )

        const { ID, record_id, record_item_id, exercise_id, set_number, set_weight, set_reps, set_max_reps, set_disable_range, set_rir, set_rest } = data

        const set_rest_minute = Math.floor( set_rest / 60 )
        const set_rest_second = set_rest - ( set_rest_minute * 60 )

        setEditData( {
            ID: ID,
            record_id: record_id,
            record_item_id: record_item_id,
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

    /**
     * Check complete
     * @param e 
     * @param set_id 
     */
    const handleComplete = ( e: React.ChangeEvent<HTMLInputElement>, set_id: number ) => {
        const { value, checked } = e.target

        const data: RecordItemCompleteDTO = {
            record_id,
            set_id,
            complete: checked
        }

        RecordAPI.updateComplete( data ).then( response => {
            if ( response.status === 200 ) {

                if ( checked ) setComplete( [ ...complete, Number( value ) ] )

                else {
                    const index = complete.indexOf( Number( value ) )
        
                    complete.splice( index, 1 )
        
                    setComplete( [ ...complete ] )
                }
            }
        } )
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

    const handleRemoveSet = ( exercise_id: number, set_id: number ) => {
        const disableRecordItemData = {
            record_id: record_id,
            set_id: set_id,
            disable: true
        }

        RecordAPI.disableRecordItem( disableRecordItemData ).then( response => {

            if ( response.status === 200 ) {

                const exercises = data.map( ( row ) => {

                    if ( exercise_id === row.ID ) {

                        const sets = row.sets.map( ( set: any ) => {
                            return set.ID !== set_id ? set : { ...set, record_item_set_disable: 1 }
                        } )

                        return { ...row, sets: sets }
                    }
                    else {
                        return row
                    }
                } )

                setData( exercises )
            }
        } )
    }


    return (
        <>
            {/* <div className="record-date">
                <Container>
                    <p className="record-date-link">
                    </p>
                </Container>
            </div> */}

            <main className="main record-main">
                <div className="record-title">
                    <Container>
                        <Row>
                            <Col xs={7}>
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
                            </Col>
                            <Col xs={5} style={{ textAlign: 'right' }}>
                                <Button variant="warning" onClick={ () => {
                                    history.push( `/create/exercise/${blockId}` )
                                } } className="icon-button">
                                    <FontAwesomeIcon icon={faDumbbell} className="button-icon" />
                                    운동 목표 수정
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container>
                    { data.map( ( item, index ) => {
                        return (
                            <Card className="record-item" key={ index }>
                                <Card.Header>
                                    <div className="record-item-header">
                                        <h4 className="create-exercise-header no margin">
                                            <FontAwesomeIcon icon={faBurn} style={{color: '#dc3545'}} />&nbsp;&nbsp;
                                            { item.exercise_name }
                                        </h4>
                                    </div>
                                </Card.Header>

                                <Card.Body className="no padding">
                                    <Table className="record-item-table no margin text align center">
                                        <tbody>
                                            { item.sets.map( ( set: any, set_index: number ) => {
                                                const is_complete = complete.indexOf( set.ID ) < 0
                                                const completeClass = is_complete ? '' : 'record-item-complete-set'

                                                const { record_item_set_disable } = set

                                                if ( typeof record_item_set_disable === "number" && record_item_set_disable ) {
                                                    return null
                                                }
                                                else {
                                                    return (
                                                        <tr key={ set_index } className={ completeClass }>
                                                            <td className="vertical align middle">
                                                                <div className="vertical align middle display inline block">
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        name="complete"
                                                                        id={ `complete-${set.ID}` }
                                                                        onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => handleComplete( e, set.ID ) }
                                                                        value={ set.ID }
                                                                        checked={ ! is_complete }
                                                                    />
                                                                </div>
                                                                {/*
                                                                &nbsp;
                                                                <div className="record-item-set-title vertical align middle display inline block">
                                                                    <Form.Label htmlFor={ `complete-${set.ID}` } className="no margin">
                                                                        { set.set_number }세트
                                                                    </Form.Label>
                                                                </div>
                                                                */}
                                                            </td>
                                                            <td className="vertical align middle">{ Number( set.set_weight ) }kg</td>
                                                            <td className="vertical align middle">{ set.set_reps }{ set.set_disable_range ? '' : `~${set.set_max_reps}` }회</td>
                                                            <td className="vertical align middle">{ set.set_rir }R</td>
                                                            <td className="vertical align middle">
                                                                { ( ( rest ) => {
                                                                    const minute = Math.floor( rest / 60 )
                                                                    const second = rest - ( minute * 60 )

                                                                    return `${minute}.${second}`
                                                                } )( set.set_rest ) }초
                                                            </td>
                                                            <td className="vertical align middle" width="1">
                                                                <Button variant="link" title="수정하기" onClick={ () => { handleEdit( set ) } }>
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Button>
                                                            </td>
                                                            <td className="vertical align middle set-td last-td" width="1">
                                                                <Button variant="link" onClick={ () => { handleRemoveSet( item.ID, set.ID ) } }>
                                                                    <FontAwesomeIcon icon={faBan} style={{ color: '#dc3545' }} />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
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
                    record_id={ record_id }
                    data={ editData }
                    updateEditData={ updateEditData }
                    updateExerciseData={ updateExerciseData }
                />
            </main>
        </>
    )
}

export default Record