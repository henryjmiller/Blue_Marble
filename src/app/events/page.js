"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEvents } from "../../context/EventsContext";
import styles from "./page.module.css";

const EMPTY_FORM = {
	title: "",
	description: "",
	date: "",
	time: "",
	location: "",
	lat: "",
	lng: "",
};

function canManageEvents(role) {
	return role === "admin" || role === "moderator";
}

export default function Events() {
	const { user } = useAuth();
	const { events, addEvent, updateEvent, deleteEvent, toggleAttendance } =
		useEvents();

	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [form, setForm] = useState(EMPTY_FORM);
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);

	function openCreate() {
		setForm(EMPTY_FORM);
		setEditingId(null);
		setShowForm(true);
	}

	function openEdit(event) {
		setForm({
			title: event.title,
			description: event.description,
			date: event.date,
			time: event.time,
			location: event.location,
			lat: event.lat ?? "",
			lng: event.lng ?? "",
		});
		setEditingId(event.id);
		setShowForm(true);
	}

	function closeForm() {
		setShowForm(false);
		setEditingId(null);
		setForm(EMPTY_FORM);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const data = {
			...form,
			lat: form.lat !== "" ? parseFloat(form.lat) : null,
			lng: form.lng !== "" ? parseFloat(form.lng) : null,
		};
		if (editingId) {
			updateEvent(editingId, data);
		} else {
			addEvent({ ...data, createdBy: user.username });
		}
		closeForm();
	}

	function handleDelete(id) {
		deleteEvent(id);
		setConfirmDeleteId(null);
	}

	function handleField(field, value) {
		setForm((prev) => ({ ...prev, [field]: value }));
	}

	const isManager = user && canManageEvents(user.role);

	return (
		<main className={styles.page}>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>Events</h1>
					<p className={styles.subtitle}>
						Beach cleanups, workshops, talks, and more — find out what's
						happening and get involved.
					</p>
				</div>
				{isManager && !showForm && (
					<button className={styles.createBtn} onClick={openCreate}>
						+ Create Event
					</button>
				)}
			</div>

			{showForm && (
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.formTitle}>
						{editingId ? "Edit Event" : "Create Event"}
					</h2>

					<label className={styles.label}>
						Title
						<input
							className={styles.input}
							type="text"
							value={form.title}
							onChange={(e) => handleField("title", e.target.value)}
							required
						/>
					</label>

					<label className={styles.label}>
						Description
						<textarea
							className={styles.textarea}
							value={form.description}
							onChange={(e) => handleField("description", e.target.value)}
							rows={3}
							required
						/>
					</label>

					<div className={styles.row}>
						<label className={styles.label}>
							Date
							<input
								className={styles.input}
								type="date"
								value={form.date}
								onChange={(e) => handleField("date", e.target.value)}
								required
							/>
						</label>
						<label className={styles.label}>
							Time
							<input
								className={styles.input}
								type="time"
								value={form.time}
								onChange={(e) => handleField("time", e.target.value)}
								required
							/>
						</label>
					</div>

					<label className={styles.label}>
						Location
						<input
							className={styles.input}
							type="text"
							value={form.location}
							onChange={(e) => handleField("location", e.target.value)}
							required
						/>
					</label>

					<div className={styles.row}>
						<label className={styles.label}>
							Latitude
							<input
								className={styles.input}
								type="number"
								step="any"
								placeholder="e.g. 51.5074"
								value={form.lat}
								onChange={(e) => handleField("lat", e.target.value)}
							/>
						</label>
						<label className={styles.label}>
							Longitude
							<input
								className={styles.input}
								type="number"
								step="any"
								placeholder="e.g. -0.1278"
								value={form.lng}
								onChange={(e) => handleField("lng", e.target.value)}
							/>
						</label>
					</div>
					<p className={styles.coordHint}>
						Optional — adds a pin on the Event Map page.
					</p>

					<div className={styles.formActions}>
						<button className={styles.submitBtn} type="submit">
							{editingId ? "Save Changes" : "Create Event"}
						</button>
						<button
							className={styles.cancelBtn}
							type="button"
							onClick={closeForm}
						>
							Cancel
						</button>
					</div>
				</form>
			)}

			{events.length === 0 ? (
				<p className={styles.empty}>
					No events yet. Check back soon or create one!
				</p>
			) : (
				<div className={styles.list}>
					{events.map((event) => {
						const isAttending =
							user && event.attendees.includes(user.username);

						return (
							<article key={event.id} className={styles.card}>
								<div className={styles.cardBody}>
									<h2 className={styles.cardTitle}>{event.title}</h2>
									<p className={styles.cardDesc}>{event.description}</p>

									<div className={styles.meta}>
										<span className={styles.metaItem}>
											{formatDate(event.date)}
										</span>
										<span className={styles.metaItem}>{event.time}</span>
										<span className={styles.metaItem}>{event.location}</span>
									</div>
								</div>

								<div className={styles.cardFooter}>
									<button
										className={`${styles.attendBtn} ${isAttending ? styles.attending : ""}`}
										onClick={() =>
											user && toggleAttendance(event.id, user.username)
										}
										disabled={!user}
										title={
											!user
												? "Log in to attend"
												: isAttending
													? "Remove attendance"
													: "I'm attending"
										}
									>
										<span className={styles.thumbIcon}>
											{isAttending ? "👍" : "👍🏻"}
										</span>
										<span>
											{event.attendees.length}
											{event.attendees.length === 1
												? " attending"
												: " attending"}
										</span>
									</button>

									{isManager && (
										<div className={styles.manageActions}>
											<button
												className={styles.editBtn}
												onClick={() => openEdit(event)}
											>
												Edit
											</button>
											{confirmDeleteId === event.id ? (
												<>
													<button
														className={styles.confirmDeleteBtn}
														onClick={() => handleDelete(event.id)}
													>
														Confirm
													</button>
													<button
														className={styles.cancelDeleteBtn}
														onClick={() => setConfirmDeleteId(null)}
													>
														Cancel
													</button>
												</>
											) : (
												<button
													className={styles.deleteBtn}
													onClick={() => setConfirmDeleteId(event.id)}
												>
													Delete
												</button>
											)}
										</div>
									)}
								</div>
							</article>
						);
					})}
				</div>
			)}
		</main>
	);
}

function formatDate(dateStr) {
	const date = new Date(dateStr + "T00:00:00");
	return date.toLocaleDateString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
