import React, { Component } from 'react'
import {
    Container,
    Form,
    InputGroup,
    Col,
    Card,
    Button,
    ToggleButton,
    ButtonGroup,
    OverlayTrigger,
    Popover,
    Table,
    Modal,
    Row
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faAngleDown,
    faAngleUp,
    faQuestionCircle,
    faEdit,
    faTrashAlt,
    faBurn,
    faDumbbell
} from "@fortawesome/free-solid-svg-icons"
import { debounce } from 'lodash'

import {
    CreatePropsInterface,
    CreateStateInterface,
    CreateExerciseDataInterface,
    CreateExerciseSetInterface
} from './create.interface'
import { RoutineAPI } from '../../api/routine/routine.api'
import { RoutineExerciseDTO } from '../../api/routine/dto/routine.exercise.dto'
import CreateEditSet from './CreateEditSet'

import './create.css'


class CreateExercise extends Component<CreatePropsInterface, CreateStateInterface> {

    constructor( props: CreatePropsInterface ) {
        super( props )

        const { block_id } = props.match.params

        this.state = {
            // UI/UX state.
            create_modal: false,
            weight_plate: 20,
            remove_exercise_modal: false,

            // Remove state.
            remove_exercise_name: '',
            remove_exercise_id: null,

            // Using form state.
            block_id: Number( block_id ),
            exercise_name: '',
            set_number: 3,
            set_weight: 0,
            set_reps: 8,
            set_max_reps: 10,
            set_disable_range: true,
            set_rir: 0,
            set_rest_minute: 1,
            set_rest_second: 30,

            // Edit set state.
            edit_set_modal: false,
            edit_exercise_name: '',
            edit_ID: -1,
            edit_exercise_id: -1,
            edit_set_disable_range: 0,
            edit_set_max_reps: -1,
            edit_set_number: -1,
            edit_set_reps: -1,
            edit_set_rest: -1,
            edit_set_rir: -1,
            edit_set_weight: -1,
            
            // Getting state.
            exerciseData: []
        }


        /** Bind events */

        this.validateForm = this.validateForm.bind( this )

        /** Create exercise events. */
        this.handleRange = this.handleRange.bind( this )
        this.handlePlateToggle = this.handlePlateToggle.bind( this )
        this.handleForm = this.handleForm.bind( this )
        this.handleIncrement = this.handleIncrement.bind( this )
        this.handleIncreaseWeight = this.handleIncreaseWeight.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
        this.handleCreateModal = this.handleCreateModal.bind( this )

        /** Remove exercise events. */
        this.handleRemoveExercise = this.handleRemoveExercise.bind( this )
        this.handleRemoveExerciseModal = this.handleRemoveExerciseModal.bind( this )
        this.handleRemoveExerciseSubmit = this.handleRemoveExerciseSubmit.bind( this )

        /** Edit set event. */
        this.handleEditSet = this.handleEditSet.bind( this )
        this.handleEditSetModal = this.handleEditSetModal.bind( this )

        /** Debounced */
        this.debouncedHandleChange = this.debouncedHandleChange.bind( this )
    }


    /** Refs */
    private exerciseRef = React.createRef<any>()


    componentDidMount() {
        RoutineAPI.getExercises( this.state.block_id )
            .then( ( { data } ) => {
                this.setState( { exerciseData: data } )
            } )
    }

    async handleEditSetModal() {
        const { edit_set_modal } = this.state

        this.setState( {
            edit_set_modal: ! edit_set_modal,
        } )
    }

    /**
     * Handle edit set.
     * @param exercise_name
     * @param data
     */
    async handleEditSet( exercise_name: string, data: CreateExerciseSetInterface ) {
        this.handleEditSetModal()
        this.setState( {
            edit_exercise_name: exercise_name,
            edit_ID: data.ID,
            edit_exercise_id: data.exercise_id,
            edit_set_number: data.set_number,
            edit_set_reps: data.set_reps,
            edit_set_max_reps: data.set_max_reps,
            edit_set_disable_range: data.set_disable_range,
            edit_set_weight: data.set_weight,
            edit_set_rir: data.set_rir,
            edit_set_rest: data.set_rest
        } )
    }

    /**
     * Handle remove exercise modal.
     */
    async handleRemoveExerciseModal() {
        const { remove_exercise_modal } = this.state

        this.setState( {
            remove_exercise_modal: ! remove_exercise_modal
        } )
    }

    /**
     * Handle remove exercise submit.
     */
    async handleRemoveExerciseSubmit() {
        this.handleRemoveExerciseModal()

        const remove_exercise_id = this.state.remove_exercise_id as number
        const response = RoutineAPI.removeExercise( remove_exercise_id )

        response.then( ( { data } ) => {
            if ( data.raw.serverStatus === 2 ) {
                RoutineAPI.getExercises( this.state.block_id )
                    .then( ( { data } ) => {
                        this.setState( {
                            exerciseData: data
                        } )
                    } )
            }
        } )
    }

    /**
     * Handle remove exercise.
     * @param exercise_id 
     * @param exercise_name 
     */
    async handleRemoveExercise( exercise_id: number, exercise_name: string ) {
        this.handleRemoveExerciseModal()

        this.setState( {
            remove_exercise_name: exercise_name,
            remove_exercise_id: exercise_id
        } )
    }

    /**
     * Handle create modal.
     */
    async handleCreateModal() {
        const { create_modal } = this.state

        this.setState( { create_modal: !create_modal } )
    }

    /**
     * Handle disable range.
     * @param e Change event from form control.
     */
    async handleRange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { checked } = e.target

        this.setState( {
            set_disable_range: !checked
        } )
    }

    /**
     * Select weight increment and decrement value.
     * @param e Change event from form control.
     */
    async handlePlateToggle( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            weight_plate: Number( value )
        } )
    }

    /**
     * Handle increment or decrement to button of weight.
     * @param i 
     */
    async handleIncreaseWeight( i: number ) {
        const increment = this.state.weight_plate * i
        let value = this.state.set_weight + increment

        const update = await this.validateForm( 'set_weight', value, '' )

        this.setState( update )
    }

    /**
     * Handle increment or decrement to button.
     * @param target_name State name.
     * @param i Increment value.
     * @param prefix Use prefix to give it unique name.
     */
    async handleIncrement( target_name: string, i: number ) {
        const value = this.state[ target_name ]
        let increment_value = Number( value ) + i

        const update = await this.validateForm( target_name, increment_value, '' )

        this.setState( update )
    }

    /**
     * Handle form control.
     * @param e Change event from form control.
     */
    async handleForm( e: React.ChangeEvent<HTMLInputElement>, prefix: string ) {

        const { name, value } = e.target

        const update = await this.validateForm( name, value, prefix )

        this.debouncedHandleChange( update )
    }

    async debouncedHandleChange( update: any ) {
        debounce( async () => {
            await this.setState( update )
        }, 500 )
    }

    /**
     * Validate form.
     * @param name 
     * @param value 
     * @param prefix 
     */
    async validateForm( name: string, value: string | number, prefix: string ): Promise<any> {
        const res: CreateStateInterface = { ...this.state }

        const validNumber = async ( value: any, default_value: number ) => {
            const number_value = Number( value )
            let res = number_value

            if ( isNaN( number_value ) ) res = default_value
            else if ( number_value < default_value ) res = default_value

            return res
        }

        switch( name ) {
            // Valid exercise_name
            case `${prefix}exercise_name`:
                if ( value )
                    this.exerciseRef.current.style.border = '1px solid #ced4da'

                res[ name ] = value
            break

            // Valid number.
            case `${prefix}set_number`:
            case `${prefix}set_rir`:
            case `${prefix}set_rest_minute`:
                    const number_value = await validNumber( value, 1 )
                res[ name ] = number_value
            break

            // Valid set_rest_second
            case `${prefix}set_rest_second`:
                const rest_second_value = await validNumber( value, 0 )
                res[ name ] = rest_second_value
            break

            // Valid set_weight
            case `${prefix}set_weight`:
                const weight_value = await validNumber( value, 0 )
                res[ name ] = weight_value
            break

            // Valid set_reps
            case `${prefix}set_reps`:
                // Validate value and set value from reps.
                let reps_value = await validNumber( value, 1 )
                res[ name ] = reps_value

                const max_reps = this.state[ `${prefix}set_max_reps` ]! as number

                // Increase max_reps when reps is higher than max_reps.
                if ( max_reps <= reps_value )
                    res[ `${prefix}set_max_reps` ] = reps_value + 1
            break

            // Valid set_max_reps
            case `${prefix}set_max_reps`:
                // Validate value and set value from max_reps.
                let max_reps_value = await validNumber( value, 2 )
                res[ name ] = max_reps_value

                const reps = this.state[ `${prefix}set_reps` ]! as number

                // Decrease reps when max_reps lower than reps.
                if ( reps >= max_reps_value )
                    res[ `${prefix}set_reps` ] = max_reps_value - 1

            break
        }

        return res
    }

    /**
     * Request api to save exercise data
     * and get response data to exercises data.
     * @param e Form event.
     */
    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        // Valid exercise name.
        const ref = this.exerciseRef.current
        if ( ! this.state.exercise_name ) ref.style.border = '1px solid #dc3545'

        else {
            const {
                block_id,
                exercise_name,
                set_number,
                set_weight,
                set_reps,
                set_max_reps,
                set_disable_range,
                set_rir,
                set_rest_minute,
                set_rest_second } = this.state
            const set_rest = set_rest_minute * 60 + set_rest_second

            const data: RoutineExerciseDTO = {
                block_id: block_id,
                exercise_name: exercise_name,
                set_number: set_number,
                set_weight: set_weight,
                set_reps: set_reps,
                set_max_reps: set_max_reps,
                set_disable_range: set_disable_range,
                set_rir: set_rir,
                set_rest: set_rest
            }
            // Create exercise and sets.
            await RoutineAPI.createExercise( data )

            // Reload exercise and sets.
            await RoutineAPI.getExercises( block_id )
            .then( ( { data } ) => {
                console.log( data )
                this.setState( {
                    exerciseData: data,
                    create_modal: false,
                    exercise_name: '',
                    weight: 0,
                    rir: 0
                } )
            } )
        }
    }

    render() {
        return (
            <main className="main">

                <Container>

                    <header className="create-header">
                        <h5>생선된 운동</h5>
                    </header>

                    {
                        ( ( data ) => {

                            const res: JSX.Element[] = []

                            // Set item list.
                            data.forEach( ( row: CreateExerciseDataInterface, index: number ) => {
                                const setElements: JSX.Element[] = []

                                row.sets.forEach( ( set, index ) => {
                                    const rest_minute = Math.floor( set.set_rest / 60 )
                                    const rest_second_decimal = ( set.set_rest / 60 ) % 1
                                    const rest_second = rest_second_decimal * 60

                                    setElements.push(
                                        <tr key={ index }>
                                            <td className="vertical align middle set-td first-td">
                                                { set.set_number }세트
                                            </td>
                                            <td className="vertical align middle set-td">
                                                { set.set_weight }kg
                                            </td>
                                            <td className="vertical align middle set-td">
                                                { set.set_reps }{ ! set.set_disable_range ? `~${ set.set_max_reps }` : '' }회
                                            </td>
                                            <td className="vertical align middle set-td">
                                                { set.set_rir }RIR
                                            </td>
                                            <td className="vertical align middle set-td">
                                                { rest_minute }분&nbsp;
                                                { rest_second }초
                                            </td>
                                            <td className="vertical align middle set-td" width="10">
                                                <Button variant="link" onClick={ () => this.handleEditSet( row.exercise_name, set ) }>
                                                    <FontAwesomeIcon icon={faEdit} title={ `${set.set_number}세트 수정` } />
                                                </Button>
                                            </td>
                                            <td className="vertical align middle set-td last-td" width="10">
                                                <Button variant="link">
                                                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#dc3545' }} />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                } )

                                // Add set button.
                                setElements.push(
                                    <tr key={ -1 }>
                                        <td colSpan={ 7 } className="create-add-set-td">
                                            <Button variant="secondary" size="lg" className="create-add-set-btn">세트 추가</Button>
                                        </td>
                                    </tr>
                                )

                                // Exercise item card.
                                res.push(
                                    <Card className="create-item" key={ index }>
                                        <Card.Header>
                                            <Row>
                                                <Col xs={ 6 }>
                                                    <h5 className="create-exercise-header no margin">
                                                        <FontAwesomeIcon icon={ faBurn } />
                                                        &nbsp;{ row.exercise_name }
                                                    </h5>
                                                </Col>
                                                <Col xs={ 6 } className="text align right create-exercise-remove-btn">
                                                    <Button variant="link" onClick={ () => this.handleRemoveExercise( row.ID, row.exercise_name ) }>
                                                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#dc3545' }} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="no padding">
                                            <Table className="record-item-table no margin text align center">
                                                <tbody>
                                                    { setElements }
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                )
                            } )

                            return res

                        } )( this.state.exerciseData )
                    }

                    <Button variant="warning" type="button" size="lg" className="create-modal-btn" onClick={ this.handleCreateModal }>
                        <FontAwesomeIcon icon={ faDumbbell } />&nbsp;
                        종목 추가하기
                    </Button>

                </Container>


                {/** Edit set modal. */}
                <CreateEditSet parent={ this } prefix="edit_" />


                {/** Remove exercise modal. */}
                <Modal size="lg" show={ this.state.remove_exercise_modal } onHide={ this.handleRemoveExerciseModal } centered>
                    <Modal.Header closeButton>
                        <Modal.Title>운동 종목 삭제</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={ { fontSize: 16 } }>
                        "{ this.state.remove_exercise_name }" 종목을 삭제 하시겠습니까?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" type="button" size="lg" onClick={ this.handleRemoveExerciseModal }>아니오</Button>
                        <Button variant="danger" type="button" size="lg" onClick={ this.handleRemoveExerciseSubmit }>삭제</Button>
                    </Modal.Footer>
                </Modal>


                {/** Create exercise modal. */}
                <Modal size="lg" show={this.state.create_modal} onHide={ this.handleCreateModal } centered>
                    <Form onSubmit={ this.handleSubmit }>

                        <Modal.Header closeButton>
                            <Modal.Title>운동 일정 작성</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                                <Form.Group>
                                    <Form.Label htmlFor="exercise_name">종목</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="exercise_name"
                                        id="exercise_name"
                                        placeholder="종목을 입력해주세요."
                                        onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) }
                                        // value={ this.state.exercise_name }
                                        ref={ this.exerciseRef }
                                    />
                                </Form.Group>

                                <Form.Row>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="set_number">세트</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'set_number', -1 ) }><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_number" id="set_number" placeholder="세트" onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_number } />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'set_number', 1 ) }><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="no margin">
                                            <Form.Label htmlFor="set_reps">횟수</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'set_reps', -1 ) }><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_reps" id="set_reps" placeholder="횟수" onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_reps } />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'set_reps', 1 ) }><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="disable-group no margin">
                                            <Form.Check type="checkbox" name="set_disable_range" id="set_disable_range" className="label-checkbox" onChange={ this.handleRange } />
                                            <label htmlFor="set_disable_range" className="label-text">최대 횟수 사용</label>
                                        </Form.Group>

                                        <Form.Group>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'set_max_reps', -1 ) } disabled={this.state.set_disable_range}>
                                                        <FontAwesomeIcon icon={ faAngleDown } />
                                                    </Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_max_reps" id="set_max_reps" placeholder="최대 횟수" disabled={this.state.set_disable_range} onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_max_reps } />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'set_max_reps', 1 ) } disabled={this.state.set_disable_range}>
                                                        <FontAwesomeIcon icon={ faAngleUp } />
                                                    </Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label htmlFor="set_weight">중량(kg)</Form.Label>

                                    <Form.Group className="weight-group">
                                        <ButtonGroup toggle aria-label="증가할 중량" className="weight-plate-group">
                                            {
                                                [
                                                    { name: '2.5kg', value: 2.5, variant: 'light' },
                                                    { name: '5kg', value: 5, variant: 'light' },
                                                    { name: '10kg', value: 10, variant: 'success' },
                                                    { name: '15kg', value: 15, variant: 'warning' },
                                                    { name: '20kg', value: 20, variant: 'primary' },
                                                    { name: '25kg', value: 25, variant: 'danger' }
                                                ]
                                                .map( ( item, idx ) => {
                                                    return (
                                                        <ToggleButton key={ idx }
                                                            type="radio"
                                                            value={ item.value }
                                                            checked={ this.state.weight_plate === item.value }
                                                            variant={ item.variant }
                                                            size="sm"
                                                            onChange={ this.handlePlateToggle }
                                                        >
                                                            {item.name}
                                                        </ToggleButton>
                                                    )
                                                } )
                                            }
                                        </ButtonGroup>
                                    </Form.Group>

                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncreaseWeight( -1 ) }>
                                                <FontAwesomeIcon icon={faAngleDown} />
                                            </Button>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" name="set_weight" id="set_weight" placeholder="중량을 입력해주세요." onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_weight } />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncreaseWeight( 1 ) }>
                                                <FontAwesomeIcon icon={faAngleUp} />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="set_rir">
                                        RIR(Repetitions In Reserve)&nbsp;
                                        <OverlayTrigger trigger="click" placement="top" overlay={
                                            <Popover id="popover-basic">
                                                <Popover.Title as="h3">*RIR(Repetitions In Reserve)</Popover.Title>
                                                <Popover.Content>
                                                    절대 피로에 도달하기 전에 남은 횟수를 추정하여 운동 강도를 측정하는 지표 입니다.<br />
                                                    예를 들어, 벤치프레스를 100kg으로 최대 8회까지 가능한 사람이 6회를 진행한다면 해당 훈련은 2RIR로 진행하게 됩니다.<br />
                                                    반대로 이 사람이 100kg을 8회로 운동을 수행하면 0RIR이 됩니다.
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <button className="btn-init" type="button">
                                                <FontAwesomeIcon icon={ faQuestionCircle } className="vertical align middle" />
                                            </button>
                                        </OverlayTrigger>
                                        
                                    </Form.Label>
                                    <Form.Control as="select" name="set_rir" id="set_rir" onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_rir }>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="set_rest_minute">휴식 시간</Form.Label>

                                    <Form.Row>
                                        <Col xs={ 4 }>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'set_rest_minute', -1 ) }>
                                                        <FontAwesomeIcon icon={ faAngleDown } />
                                                    </Button>
                                                </InputGroup.Prepend>

                                                <Form.Control type="text" name="set_rest_minute" id="set_rest_minute" onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_rest_minute } />

                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'set_rest_minute', 1 ) }>
                                                        <FontAwesomeIcon icon={ faAngleUp } />
                                                    </Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                        <Form.Label htmlFor="set_rest_minute" column xs={ 1 }>분</Form.Label>

                                        <Col xs={ 4 }>
                                            <Form.Control as="select" name="set_rest_second" id="set_rest_second" onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => this.handleForm( e, '' ) } value={ this.state.set_rest_second }>
                                                {
                                                    [ ...Array( 59 ) ].map( ( v, i ) => {
                                                        return <option value={ i + 1 } key={ i }>{i + 1}</option>
                                                    } )
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Form.Label htmlFor="set_rest_second" column xs={ 1 }>초</Form.Label>
                                    </Form.Row>
                                </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" type="submit" size="lg" className="create-submit-btn">저장</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

            </main>
        )
    }
}

export default CreateExercise