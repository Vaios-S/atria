import { Link, useParams } from "react-router-dom";
import "./SpacePage.css";
import SpaceHeader from "../../components/space/SpaceHeader";
import SpaceStats from "../../components/space/SpaceStats";
import { useState } from "react";
import type { QuestCompletion } from "../../types/questCompletion";
import type { Quest } from "../../types/quest";
import Modal from "../../components/ui/Modal";
import QuestForm, {
  type QuestFormData,
} from "../../components/space/QuestForm";
import Button from "../../components/ui/Button";
import {
  getActiveQuests,
  getCompletedQuests,
  getQuestProgress,
  getQuestsBySpace,
} from "../../utils/spaceQuestUtils";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import type { Space } from "../../types/space";
import { format } from "date-fns";
import type { SpaceSection, SpaceSectionType } from "../../types/spaceSection";
import QuestSection from "../../components/space/sections/QuestSection";
import EmptyState from "../../components/ui/EmptyState";
import SectionPicker from "../../components/space/SectionPicker";
import type { ChecklistItem } from "../../types/checklistItem";
import ChecklistSection from "../../components/space/sections/ChecklistSection";
import { SPACE_SECTION_LABELS } from "../../constants/sectionsTypes";
import QuestActionsMenu from "../../components/ui/QuestActionsMenu";

type SpacePageProps = {
  spaces: Space[];
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;

  spaceSections: SpaceSection[];
  setSpaceSections: React.Dispatch<React.SetStateAction<SpaceSection[]>>;

  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;

  questCompletions: QuestCompletion[];
  setQuestCompletions: React.Dispatch<React.SetStateAction<QuestCompletion[]>>;

  checkListItems: ChecklistItem[];
  setCheckListItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
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
  checkListItems,
  setCheckListItems,
}: SpacePageProps) {
  const { id } = useParams();

  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  const [editingQuest, setEditingQuest] = useState<Quest | undefined>(
    undefined,
  );

  const [questToDelete, setQuestToDelete] = useState<Quest | undefined>(
    undefined,
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isSectionPickerOpen, setIsSectionPickerOpen] = useState(false);

  const space = spaces.find((space) => space.id === id);

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
        questId: `${questId}`,
        completedAt: new Date().toISOString(),
      };
      setQuestCompletions((prev) => [...prev, newCompletion]);
    }
  }

  function onDeleteQuest(quest: Quest) {
    setQuestToDelete(quest);
    setIsDeleteModalOpen(true);
  }

  function handleDeleteQuest() {
    if (!questToDelete) return;

    setQuests((prev) => prev.filter((quest) => quest.id !== questToDelete.id));
    setQuestCompletions((prev) =>
      prev.filter((completion) => completion.questId !== questToDelete.id),
    );
    setIsDeleteModalOpen(false);
    setQuestToDelete(undefined);
  }

  function handleEditQuest(quest: Quest) {
    setEditingQuest(quest);
    setIsQuestModalOpen(true);
  }

  if (!space) {
    return <h1>Space not found</h1>;
  }

  const currentSpaceSections = spaceSections.filter(
    (section) => section.spaceId === space.id,
  );

  const spaceQuests = getQuestsBySpace(quests, space.id);

  const activeQuests = getActiveQuests(spaceQuests, questCompletions);

  const todayActiveQuest = activeQuests.filter(
    (quest) =>
      quest.scheduledDate !== undefined &&
      quest.scheduledDate === format(new Date(), "yyyy-MM-dd"),
  );

  const upcomingActiveQuest = activeQuests.filter(
    (quest) =>
      quest.scheduledDate !== undefined &&
      quest.scheduledDate > format(new Date(), "yyyy-MM-dd"),
  );
  const overDueActiveQuest = activeQuests.filter(
    (quest) =>
      quest.scheduledDate !== undefined &&
      quest.scheduledDate < format(new Date(), "yyyy-MM-dd"),
  );

  const completedQuests = getCompletedQuests(spaceQuests, questCompletions);

  const progress = getQuestProgress(spaceQuests, completedQuests);

  const spaceId = space.id;

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

  const [nameOfSection, setNameOfSection] = useState("");

  function handleAddSection(type: SpaceSectionType) {
    const newSection: SpaceSection = {
      id: crypto.randomUUID(),
      title:
        nameOfSection.length === 0 ? SPACE_SECTION_LABELS[type] : nameOfSection,
      spaceId: space?.id,
      type,
      position: currentSpaceSections.length,
      createdAt: new Date().toISOString(),
    };
    setSpaceSections((prev) => [...prev, newSection]);
    setIsSectionPickerOpen(false);
    setNameOfSection("");
  }

  function handleAddItem(sectionId: string, text: string) {
    const newItem: ChecklistItem = {
      id: crypto.randomUUID(),
      sectionId,
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setCheckListItems((prev) => [...prev, newItem]);
  }

  function handleToggleItem(itemId: string) {
    setCheckListItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function handleDeleteItem(itemId: string) {
    setCheckListItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  const [isSectionActionOpen, setIsSectionActionOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  function onSelectedSection(sectionId: string) {
    setSelectedSection(sectionId);
    setIsSectionActionOpen(true);
  }

  function handleDeleteSection() {
    setSpaceSections((prev) =>
      prev.filter((section) => section.id !== selectedSection),
    );
    setCheckListItems((prev) =>
      prev.filter((item) => item.sectionId !== selectedSection),
    );
    setIsSectionActionOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedSection("");
  }
  console.log(checkListItems);

  function handleOpenDeleteSection() {
    setIsSectionActionOpen(false);
    setIsDeleteModalOpen(true);
  }

  const [isSectionEditOpen, setIsSectionEditOpen] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("");

  function handleEditSection() {
    const sectionToEdit = spaceSections.find(
      (section) => section.id === selectedSection,
    );

    if (!sectionToEdit) return;

    setSectionTitle(sectionToEdit.title);
    setIsSectionActionOpen(false);
    setIsSectionEditOpen(true);
  }

  function handleSaveSectionTitle() {
    const sectionToEdit = spaceSections.find(
      (section) => section.id === selectedSection,
    );

    if (!sectionToEdit) return;

    const updatedSection = {
      ...sectionToEdit,
      title: sectionTitle,
    };

    setSpaceSections((prev) =>
      prev.map((section) =>
        section.id === selectedSection ? updatedSection : section,
      ),
    );
    setIsSectionEditOpen(false);
    setSelectedSection("");
    setSectionTitle("");
  }

  return (
    <main className="space-page">
      <Link to="/" className="space-page__back-link">
        ← Back
      </Link>
      <Button onClick={onAddQuest}>Add Quest</Button>
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
        />
      </Modal>

      {currentSpaceSections.length === 0 ? (
        <EmptyState
          icon="🧩"
          title="No sections yet"
          description="Add your first section to start building this space."
        />
      ) : (
        currentSpaceSections.map((section) => {
          if (section.type === "quests") {
            return (
              <QuestSection
                key={section.id}
                todayQuests={todayActiveQuest}
                upcomingQuests={upcomingActiveQuest}
                overdueQuests={overDueActiveQuest}
                completedQuests={completedQuests}
                onToggleQuest={handleToggleQuest}
                onDeleteQuest={onDeleteQuest}
                onEditQuest={handleEditQuest}
                onAddQuest={onAddQuest}
              />
            );
          }
          if (section.type === "checklist") {
            const sectionChecklistItems = checkListItems.filter(
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
        isOpen={isDeleteModalOpen}
        title="Delete Quest"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setQuestToDelete(undefined);
        }}
      >
        <ConfirmDialog
          title="Delete Quest"
          message={`Are you sure you want to delete the quest "${questToDelete?.title}"?`}
          onConfirm={handleDeleteQuest}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setQuestToDelete(undefined);
          }}
        />
      </Modal>

      {isSectionActionOpen && selectedSection && (
        <QuestActionsMenu
          onEdit={handleEditSection}
          onDelete={handleOpenDeleteSection}
          onClose={() => {
            setIsSectionActionOpen(false);
            setSelectedSection("");
          }}
        />
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Section"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSection("");
        }}
      >
        <ConfirmDialog
          title="Delete Section"
          message="Are you sure you want to delete this section?"
          onConfirm={handleDeleteSection}
          onCancel={() => {
            setIsDeleteModalOpen(false);
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
