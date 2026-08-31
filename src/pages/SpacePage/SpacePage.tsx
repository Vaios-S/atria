// React
import { useState } from "react";

// Libraries
import { Link, useParams } from "react-router-dom";

// Components
import SpaceHeader from "../../components/space/SpaceHeader";
import SpaceStats from "../../components/space/SpaceStats";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import QuestSection from "../../components/space/sections/QuestSection";
import EmptyState from "../../components/ui/EmptyState";
import SectionPicker from "../../components/space/SectionPicker";
import QuestActionsMenu from "../../components/ui/QuestActionsMenu";
import NotesSection from "../../components/space/sections/NotesSection";
import ChecklistSection from "../../components/space/sections/ChecklistSection";
import QuestForm from "../../components/space/QuestForm";

// Utils / constants
import {
  getActiveQuests,
  getCompletedQuests,
  getQuestProgress,
  getQuestsBySpace,
  getTodayQuests,
  getUpcomingQuests,
  getOverdueQuests,
} from "../../utils/spaceQuestUtils";
import { SPACE_SECTION_LABELS } from "../../constants/sectionsTypes";

//Types
import type { QuestCompletion } from "../../types/questCompletion";
import type { Quest } from "../../types/quest";
import type { Space } from "../../types/space";
import type { SpaceSection, SpaceSectionType } from "../../types/spaceSection";
import type { Note } from "../../types/note";
import type { ChecklistItem } from "../../types/checklistItem";
import type { QuestFormData } from "../../types/questForm";

// Styles
import "./SpacePage.css";

type SpacePageProps = {
  spaces: Space[];
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;

  spaceSections: SpaceSection[];
  setSpaceSections: React.Dispatch<React.SetStateAction<SpaceSection[]>>;

  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;

  questCompletions: QuestCompletion[];
  setQuestCompletions: React.Dispatch<React.SetStateAction<QuestCompletion[]>>;

  checklistItems: ChecklistItem[];
  setChecklistItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;

  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export default function SpacePage({
  spaces,
  setSpaces,
  spaceSections,
  setSpaceSections,
  quests,
  setQuests,
  questCompletions,
  setQuestCompletions,
  checklistItems,
  setChecklistItems,
  notes,
  setNotes,
}: SpacePageProps) {
  // params
  const { id } = useParams();

  // state
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isDeleteQuestModalOpen, setIsDeleteQuestModalOpen] = useState(false);
  const [isDeleteSectionModalOpen, setIsDeleteSectionModalOpen] =
    useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | undefined>(
    undefined,
  );
  const [questToDelete, setQuestToDelete] = useState<Quest | undefined>(
    undefined,
  );
  const [isSectionPickerOpen, setIsSectionPickerOpen] = useState(false);
  const [nameOfSection, setNameOfSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isSectionEditOpen, setIsSectionEditOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [isQuestActionsMoadalOpen, setIsQuestActionsMoadalOpen] =
    useState(false);

  // current space
  const space = spaces.find((space) => space.id === id);

  if (!space) {
    return <h1>Space not found</h1>;
  }

  // derived data
  const spaceId = space.id;

  const currentSpaceSections = spaceSections.filter(
    (section) => section.spaceId === space.id,
  );

  const spaceQuests = getQuestsBySpace(quests, space.id);

  const activeQuests = getActiveQuests(spaceQuests, questCompletions);

  const todayActiveQuests = getTodayQuests(activeQuests);

  const upcomingActiveQuests = getUpcomingQuests(activeQuests);

  const overdueActiveQuests = getOverdueQuests(activeQuests);

  const completedQuests = getCompletedQuests(spaceQuests, questCompletions);

  const progress = getQuestProgress(spaceQuests, completedQuests);

  const hasQuestSection = currentSpaceSections.some(
    (section) => section.type === "quests",
  );

  const sortedSpaceSections = [...currentSpaceSections].sort(
    (a, b) => a.position - b.position,
  );

  // handlers

  // Quest handlers
  function handleToggleQuest(questId: string) {
    const completionExists = questCompletions.some(
      (completion) => completion.questId === questId,
    );

    if (completionExists) {
      setQuestCompletions((prev) =>
        prev.filter((completion) => completion.questId !== questId),
      );
    } else {
      const newCompletion: QuestCompletion = {
        id: crypto.randomUUID(),
        userId: "user-1",
        questId,
        completedAt: new Date().toISOString(),
      };
      setQuestCompletions((prev) => [...prev, newCompletion]);
    }
  }

  function onDeleteQuest(quest: Quest) {
    setQuestToDelete(quest);
    setIsDeleteQuestModalOpen(true);
  }

  function handleDeleteQuest() {
    if (!questToDelete) return;

    setQuests((prev) => prev.filter((quest) => quest.id !== questToDelete.id));
    setQuestCompletions((prev) =>
      prev.filter((completion) => completion.questId !== questToDelete.id),
    );
    setIsDeleteQuestModalOpen(false);
    setQuestToDelete(undefined);
  }

  function handleEditQuest(quest: Quest) {
    setEditingQuest(quest);
    setIsQuestModalOpen(true);
  }

  function handleAddQuest(formData: QuestFormData) {
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      userId: "user-1",
      spaceId,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      scheduledDate: formData.scheduledDate,
      createdAt: new Date().toISOString(),
    };
    setQuests((prev) => [...prev, newQuest]);
    setEditingQuest(undefined);
    setIsQuestModalOpen(false);
  }

  function handleUpdateQuest(formData: QuestFormData) {
    if (!editingQuest) return;

    const updatedQuest: Quest = {
      ...editingQuest,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      scheduledDate: formData.scheduledDate,
    };
    setQuests((prev) =>
      prev.map((q) => (q.id === editingQuest.id ? updatedQuest : q)),
    );
    setIsQuestModalOpen(false);
    setEditingQuest(undefined);
  }

  function onAddQuest() {
    setEditingQuest(undefined);
    setIsQuestModalOpen(true);
  }

  // Section handlers
  function handleAddSection(type: SpaceSectionType) {
    const trimmedName = nameOfSection.trim();
    const newSection: SpaceSection = {
      id: crypto.randomUUID(),
      title:
        trimmedName.length === 0 ? SPACE_SECTION_LABELS[type] : trimmedName,
      spaceId: space?.id,
      type,
      position: currentSpaceSections.length,
      createdAt: new Date().toISOString(),
    };
    setSpaceSections((prev) => [...prev, newSection]);
    setIsSectionPickerOpen(false);
    setNameOfSection("");
  }

  function onSelectedSection(sectionId: string) {
    setSelectedSection(sectionId);
    setIsQuestActionsMoadalOpen(true);
  }

  function handleOpenDeleteSection() {
    setIsQuestActionsMoadalOpen(false);
    setIsDeleteSectionModalOpen(true);
  }

  function handleDeleteSection() {
    setSpaceSections((prev) => {
      const sectionsAfterDelete = prev.filter(
        (section) => section.id !== selectedSection,
      );

      const otherSpaceSections = sectionsAfterDelete.filter(
        (section) => section.spaceId !== spaceId,
      );

      const normalizedCurrentSections = sectionsAfterDelete
        .filter((section) => section.spaceId === spaceId)
        .sort((a, b) => a.position - b.position)
        .map((section, index) => ({
          ...section,
          position: index,
        }));
      return [...otherSpaceSections, ...normalizedCurrentSections];
    });
    setChecklistItems((prev) =>
      prev.filter((item) => item.sectionId !== selectedSection),
    );
    setNotes((prev) =>
      prev.filter((note) => note.sectionId !== selectedSection),
    );
    setIsQuestActionsMoadalOpen(false);
    setIsDeleteSectionModalOpen(false);
    setSelectedSection("");
  }

  function handleEditSection() {
    const sectionToEdit = spaceSections.find(
      (section) => section.id === selectedSection,
    );

    if (!sectionToEdit) return;

    setSectionTitle(sectionToEdit.title);
    setIsQuestActionsMoadalOpen(false);
    setIsSectionEditOpen(true);
  }

  function handleSaveSectionTitle() {
    setSpaceSections((prev) =>
      prev.map((section) =>
        section.id === selectedSection
          ? { ...section, title: sectionTitle }
          : section,
      ),
    );
    setIsSectionEditOpen(false);
    setSelectedSection("");
    setSectionTitle("");
  }

  function handleMoveSection(sectionId: string, direction: "up" | "down") {
    setSpaceSections((prev) => {
      const currentSections = prev
        .filter((section) => section.spaceId === spaceId)
        .sort((a, b) => a.position - b.position);

      const currentIndex = currentSections.findIndex(
        (section) => section.id === sectionId,
      );

      if (currentIndex === -1) return prev;

      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= currentSections.length) {
        return prev;
      }

      const currentSection = currentSections[currentIndex];
      const targetSection = currentSections[targetIndex];

      return prev.map((section) => {
        if (section.id === currentSection.id) {
          return {
            ...section,
            position: targetSection.position,
          };
        }

        if (section.id === targetSection.id) {
          return {
            ...section,
            position: currentSection.position,
          };
        }

        return section;
      });
    });
  }

  // Checklist handlers
  function handleAddItem(sectionId: string, text: string) {
    const newItem: ChecklistItem = {
      id: crypto.randomUUID(),
      sectionId,
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setChecklistItems((prev) => [...prev, newItem]);
  }

  function handleToggleItem(itemId: string) {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function handleDeleteItem(itemId: string) {
    setChecklistItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  // Notes handlers
  function onSaveNote(sectionId: string, content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      sectionId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => {
      const existingNote = prev.find((note) => note.sectionId === sectionId);

      if (!existingNote) {
        return [...prev, newNote];
      }
      return prev.map((note) =>
        note.sectionId === sectionId
          ? { ...note, content: content, updatedAt: new Date().toISOString() }
          : note,
      );
    });
  }

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <SpaceHeader
        space={space}
        activeQuests={activeQuests.length}
        progress={progress}
      />
      <SpaceStats
        active={activeQuests.length}
        completed={completedQuests.length}
      />

      <Button onClick={() => setIsSectionPickerOpen(true)}>
        + Add Section
      </Button>

      <Modal
        isOpen={isSectionPickerOpen}
        title="Add Section"
        onClose={() => {
          setIsSectionPickerOpen(false);
          setNameOfSection("");
        }}
      >
        <SectionPicker
          onSelect={handleAddSection}
          setNameOfSection={setNameOfSection}
          nameOfSection={nameOfSection}
          hasQuestSection={hasQuestSection}
        />
      </Modal>

      {currentSpaceSections.length === 0 ? (
        <EmptyState
          icon="🧩"
          title="No sections yet"
          description="Add your first section to start building this space."
        />
      ) : (
        sortedSpaceSections.map((section, index) => {
          const canMoveUp = index > 0;

          const canMoveDown = index < sortedSpaceSections.length - 1;

          if (section.type === "quests") {
            return (
              <QuestSection
                key={section.id}
                todayQuests={todayActiveQuests}
                upcomingQuests={upcomingActiveQuests}
                overdueQuests={overdueActiveQuests}
                completedQuests={completedQuests}
                onToggleQuest={handleToggleQuest}
                onDeleteQuest={onDeleteQuest}
                onEditQuest={handleEditQuest}
                onAddQuest={onAddQuest}
                sectionId={section.id}
                title={section.title}
                onSelectedSection={onSelectedSection}
                onMoveUp={(sectionId) => handleMoveSection(sectionId, "up")}
                onMoveDown={(sectionId) => handleMoveSection(sectionId, "down")}
                canMoveUp={canMoveUp}
                canMoveDown={canMoveDown}
              />
            );
          }
          if (section.type === "checklist") {
            const sectionChecklistItems = checklistItems.filter(
              (item) => item.sectionId === section.id,
            );
            return (
              <ChecklistSection
                key={section.id}
                items={sectionChecklistItems}
                title={section.title}
                sectionId={section.id}
                handleAddItem={handleAddItem}
                handleToggleItem={handleToggleItem}
                handleDeleteItem={handleDeleteItem}
                onSelectedSection={onSelectedSection}
                onMoveUp={(sectionId) => handleMoveSection(sectionId, "up")}
                onMoveDown={(sectionId) => handleMoveSection(sectionId, "down")}
                canMoveUp={canMoveUp}
                canMoveDown={canMoveDown}
              />
            );
          }

          if (section.type === "notes") {
            const sectionNote = notes.find(
              (note) => note.sectionId === section.id,
            );
            return (
              <NotesSection
                key={section.id}
                sectionId={section.id}
                title={section.title}
                note={sectionNote}
                onSelectedSection={onSelectedSection}
                onSaveNote={onSaveNote}
                onMoveUp={(sectionId) => handleMoveSection(sectionId, "up")}
                onMoveDown={(sectionId) => handleMoveSection(sectionId, "down")}
                canMoveUp={canMoveUp}
                canMoveDown={canMoveDown}
              />
            );
          }
          return null;
        })
      )}

      <Modal
        isOpen={isQuestModalOpen}
        title={editingQuest ? "Edit Quest" : "Add Quest"}
        onClose={() => {
          setIsQuestModalOpen(false);
          setEditingQuest(undefined);
        }}
      >
        <QuestForm
          initialValues={editingQuest}
          submitLabel={editingQuest ? "Save Changes" : "Add Quest"}
          onSubmit={editingQuest ? handleUpdateQuest : handleAddQuest}
          onCancel={() => setIsQuestModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteQuestModalOpen}
        title="Delete Quest"
        onClose={() => {
          setIsDeleteQuestModalOpen(false);
          setQuestToDelete(undefined);
        }}
      >
        <ConfirmDialog
          title="Delete Quest"
          message={`Are you sure you want to delete the quest "${questToDelete?.title}"?`}
          onConfirm={handleDeleteQuest}
          onCancel={() => {
            setIsDeleteQuestModalOpen(false);
            setQuestToDelete(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={isQuestActionsMoadalOpen}
        title="Quest Actions"
        onClose={() => {
          setIsQuestActionsMoadalOpen(false);
          setSelectedSection("");
        }}
      >
        <QuestActionsMenu
          onEdit={handleEditSection}
          onDelete={handleOpenDeleteSection}
          onClose={() => {
            setIsQuestActionsMoadalOpen(false);
            setSelectedSection("");
          }}
        />
      </Modal>

      <Modal
        isOpen={isDeleteSectionModalOpen}
        title="Delete Section"
        onClose={() => {
          setIsDeleteSectionModalOpen(false);
          setSelectedSection("");
        }}
      >
        <ConfirmDialog
          title="Delete Section"
          message="Are you sure you want to delete this section?"
          onConfirm={handleDeleteSection}
          onCancel={() => {
            setIsDeleteSectionModalOpen(false);
            setSelectedSection("");
          }}
        />
      </Modal>
      <Modal
        isOpen={isSectionEditOpen}
        title="Edit Section"
        onClose={() => {
          setIsSectionEditOpen(false);
        }}
      >
        <div className="section-edit">
          <div className="section-edit__field">
            <label htmlFor="section-title" className="section-edit__label">
              Section title
            </label>

            <input
              id="section-title"
              type="text"
              className="section-edit__input"
              value={sectionTitle}
              onChange={(event) => setSectionTitle(event.target.value)}
              placeholder="Name your section..."
              autoComplete="off"
            />
          </div>

          <div className="section-edit__actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsSectionEditOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleSaveSectionTitle}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
