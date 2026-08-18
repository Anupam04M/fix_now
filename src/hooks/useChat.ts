import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabsae.config";

export const useChat = (
  conversationId: string,
  role: "BUYER" | "DISTRIBUTOR" | "FARMER", // Keep this for saving the message, not for fetching
) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!conversationId) return;

    // 1. Fetch initial message history: Filter by conversation_id ONLY
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) console.error("Fetch Error:", error);
      if (data) setMessages(data);
    };
    fetchMessages();

    // 2. Subscribe to real-time messages: Filter by conversation_id ONLY
    const channel = supabase
      .channel(`chat_${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // ... uploadAttachment remains same ...

  const sendMessage = async (
    senderId: string,
    content: string,
    fileUrl?: string | null,
  ) => {
    await supabase.from("messages").insert([
      {
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        file_url: fileUrl,
        chat_type: role, // Keep this for reference, but don't use it to filter
      },
    ]);
  };

  return { messages, sendMessage };
};
