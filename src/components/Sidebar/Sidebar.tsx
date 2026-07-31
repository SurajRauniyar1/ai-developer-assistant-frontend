import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Search,
  LogOut,
  MessageSquare,
  Bot,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import {
  createConversation,
  renameConversation,
  deleteConversation,
} from "../../services/conversationService";

import { useAuth } from "../../context/AuthContext";
import { useConversation } from "../../context/ConversationContext";

const Sidebar = () => {
  const { logout } = useAuth();
const [search, setSearch] = useState("");
  const {
    conversations,
    addConversation,
    refreshConversations,
    selectedConversation,
    setSelectedConversation,
  } = useConversation();

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editingTitle, setEditingTitle] =
    useState("");

  const [menuId, setMenuId] =
    useState<number | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setMenuId(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleNewChat = async () => {
    try {
      const conversation =
        await createConversation(
          "New Chat"
        );

      addConversation(conversation);

      setSelectedConversation(
        conversation
      );
    } catch (error) {
      console.error(error);
    }
  };

  const startRename = (
    id: number,
    title: string
  ) => {
    setEditingId(id);
    setEditingTitle(title);
    setMenuId(null);
  };

  const handleRename = async (
    id: number
  ) => {
    const title =
      editingTitle.trim();

    if (!title) {
      setEditingId(null);
      return;
    }

    try {
      await renameConversation(
        id,
        title
      );

      await refreshConversations();

      if (
        selectedConversation?.id === id
      ) {
        setSelectedConversation({
          ...selectedConversation,
          title,
        });
      }

      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteConversation(
        deleteId
      );

      if (
        selectedConversation?.id ===
        deleteId
      ) {
        setSelectedConversation(
          null
        );
      }

      await refreshConversations();

      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };
const filteredConversations = conversations.filter((conversation) =>
  conversation.title
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <div className="flex h-full flex-col bg-[#111827]">

      {/* Header */}

      <div className="border-b border-gray-800 px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-2">
            <Bot
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-base font-semibold text-white">
              AI Assistant
            </h1>

            <p className="text-xs text-gray-400">
              Developer Edition
            </p>
          </div>

        </div>

      <button
  onClick={handleNewChat}
  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
>
  <Plus size={16} />
  New Chat
</button>

<div className="relative mt-4">
  <Search
    size={16}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />

  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search conversations..."
    className="w-full rounded-xl border border-gray-700 bg-gray-900 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
  />
</div>
      </div>
            {/* Conversation List */}

      {/* Conversation List */}

<div className="flex-1 overflow-y-auto p-3 space-y-2">

  {filteredConversations.length === 0 ? (

    <div className="flex h-40 items-center justify-center text-sm text-gray-500">
      No conversations found
    </div>

  ) : (

    filteredConversations.map((conversation) => (
      <div
        key={conversation.id}
        className={`group relative rounded-xl transition ${
          selectedConversation?.id === conversation.id
            ? "bg-blue-600/20"
            : "hover:bg-gray-800"
        }`}
      >
        <div
          className="flex cursor-pointer items-center justify-between px-3 py-3"
          onClick={() =>
            setSelectedConversation(conversation)
          }
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">

            <MessageSquare
              size={16}
              className="text-gray-400"
            />

            {editingId === conversation.id ? (
              <input
                autoFocus
                value={editingTitle}
                onChange={(e) =>
                  setEditingTitle(e.target.value)
                }
                onBlur={() =>
                  handleRename(conversation.id)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRename(conversation.id);
                  }

                  if (e.key === "Escape") {
                    setEditingId(null);
                  }
                }}
                className="w-full rounded bg-gray-900 px-2 py-1 text-sm text-white outline-none"
              />
            ) : (
              <span className="truncate text-sm text-white">
                {conversation.title}
              </span>
            )}

          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();

              setMenuId(
                menuId === conversation.id
                  ? null
                  : conversation.id
              );
            }}
            className="rounded-lg p-1 opacity-0 transition hover:bg-gray-700 group-hover:opacity-100"
          >
            <MoreVertical
              size={16}
              className="text-gray-300"
            />
          </button>

        </div>

        {menuId === conversation.id && (
          <div
            ref={menuRef}
            className="absolute right-3 top-12 z-20 w-40 overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-xl"
          >
            <button
              onClick={() =>
                startRename(
                  conversation.id,
                  conversation.title
                )
              }
              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-white transition hover:bg-gray-800"
            >
              <Pencil size={15} />
              Rename
            </button>

            <button
              onClick={() => {
                setDeleteId(conversation.id);
                setMenuId(null);
              }}
              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 transition hover:bg-gray-800"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        )}
      </div>
    ))

  )}

</div>



      {/* Footer */}

      <div className="border-t border-gray-800 p-4">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-white transition hover:bg-red-700"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

      {/* Delete Dialog */}

      {deleteId && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-[360px] rounded-2xl bg-gray-900 p-6 shadow-2xl">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-lg font-semibold text-white">
                Delete Conversation
              </h2>

              <button
                onClick={() =>
                  setDeleteId(null)
                }
              >
                <X
                  size={18}
                  className="text-gray-400"
                />
              </button>

            </div>

            <p className="mb-6 text-sm text-gray-400">
              This conversation will be permanently deleted.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setDeleteId(null)
                }
                className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Sidebar;