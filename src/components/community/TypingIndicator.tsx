const TypingIndicator = () => {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-sm text-muted-foreground">Someone is typing...</span>
      </div>
    );
  };
  
  export default TypingIndicator;