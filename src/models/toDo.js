export class ToDoModel {
    constructor(id, text, dueDate, doneFlag, priority, creationDate) {
        this.id = id;
        this.text = text;
        this.dueDate = dueDate;
        this.doneFlag = doneFlag;
        this.priority = priority;
        this.creationDate = creationDate;
    }
    set text(value) {
        if (value.length > 120)
            throw new Error("La cadena no puede tener mas de 120 caracteres");
        this._text = value;
    }
    set doneFlag(value) {
        if (typeof (value) !== 'boolean')
            throw new Error("La bandera tiene que ser un boolean");
        this._doneFlag = value;
        if (this.doneFlag && this.doneDate != null)
            this._doneDate = new Date();
    }
    set doneDate(value) {
        if (!this.doneFlag)
            throw new Error("No se puede establecer una fecha si aun no se completa la tarea");
        this._doneDate = value;
    }
    set priority(value) {
        if (value !== 'High' && value !== 'Medium' && value !== 'Low')
            throw new Error("La prioridad no coincide con los valores aceptados");
        this._priority = value;
    }
    set creationDate(value){
        this._creationDate = value
    }
}