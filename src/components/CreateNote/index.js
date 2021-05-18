import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import IconContainer from "../IconContainer";
import "./createNote.css";
import CreateUpdateForm from "../CreateUpdateForm";
import { NoteIcons } from "../../assets/local-data";

const CreateNote = () => {
	const {
		setNotesList,
		notesList,
		noteTitle,
		setNoteTitle,
		noteBody,
		setNoteBody,
		isFormExpanded,
		setIsFormExpanded,
		setPlaceHolder,
		formHeight,
		setFormHeight,
		selectedId,
	} = useGlobalContext();

	useEffect(() => {
		if (isFormExpanded) {
			setFormHeight("auto");
			setPlaceHolder("Title");
		} else {
			setFormHeight("55px");
			setPlaceHolder("Take a Note...");
		}
	}, [isFormExpanded]);

	let data = {
		query: { selectedId },
		noteData: { title: noteTitle, detail: noteBody },
	};

	const putData = async () => {
		try {
			const response = await fetch("/api", {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			return response.json();
		} catch (error) {
			console.error(error);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		await putData(data);
		setNotesList([...notesList, data.noteData]);
		setNoteTitle("");
		setNoteBody("");
		return;
	};

	return (
		<div className="create-form-container" style={{ height: formHeight }}>
			<CreateUpdateForm />
			<IconContainer
				NoteIcons={NoteIcons}
				submitHandler={submitHandler}
				setIsFormExpanded={setIsFormExpanded}
			></IconContainer>
		</div>
	);
};

export default CreateNote;
